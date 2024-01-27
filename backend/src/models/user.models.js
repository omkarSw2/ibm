const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,

    required: [true, "Password is required"],
  },
  avatar: {
    type: String, //cloudinary url
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = { User };
