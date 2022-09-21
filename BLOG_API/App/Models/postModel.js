const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    stars: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PostStar",
        default: null,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null,
      },
    ],
    // comments:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"Comment",
    // }
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Post", postModel);
