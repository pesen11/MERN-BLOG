const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        default: null,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Tag", tagModel);
