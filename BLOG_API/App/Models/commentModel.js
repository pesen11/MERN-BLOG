const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentModel = new Schema(
  {
    comment: {
      type: String,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Comment", commentModel);
