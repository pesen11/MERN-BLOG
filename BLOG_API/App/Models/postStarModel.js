const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postStarModel = new Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("PostStar", postStarModel);
