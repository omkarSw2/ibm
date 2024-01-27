const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.Controllers");
const { upload } = require("../middlewares/multer.middleware");

const UserRouter = express.Router();

UserRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
UserRouter.route("/login").post(loginUser);

module.exports = { UserRouter };
