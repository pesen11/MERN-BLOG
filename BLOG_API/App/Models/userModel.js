const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    role: [
      {
        type: String,
        enum: ["author", "admin"],
        default: "author",
      },
    ],
    about: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        default: null,
      },
    ],
    // followers: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   default: null,
    // },
    // following: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   default: null,
    // },

    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],

    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("User", userModel);
