const { uploadOnCloudinary } = require("../utils/cloudinary");
const { User } = require("../models/user.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // validation
  if ([email, username, password].some((field) => field.trim() === "")) {
    return req.status(400).send({ msg: "All Fields Are Required" });
  }

  // find user Exist
  const ExistedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (ExistedUser) {
    return req
      .status(409)
      .send({ msg: "User With Email OR Username is Alredy Exist" });
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  // Image Validation
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is Require ");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  console.log("avatar", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar File is Require ");
  }

  const user = await User.create({
    avatar: avatar.url,
    email,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User Register Successfully .!"));
};

const loginUser = async (req, res) => {
  /**
   * check req data is  Available
   * check username or email is Available
   * find user
   * check password
   * accesToke refreshToken
   * sent cookies
   */
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({ msg: "Username or Email is required" });
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    return res.status(400).send({ msg: "User Do not Exist " });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ msg: "Invalid User Credintials. " });
  }

  const refreshToken = jwt.sign(user.email, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  const logedinUser = await User.findById(user._id).select("-password ");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedinUser,
          accessToken,
          refreshToken,
        },
        "User Login Success.."
      )
    );
};
module.exports = { registerUser, loginUser };
