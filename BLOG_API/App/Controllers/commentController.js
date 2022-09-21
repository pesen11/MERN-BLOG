const Comment = require("../Models/commentModel");

const Post = require("../Models/postModel");

const rbacMiddleware = require("../Middleware/rbacMiddleware");
const { default: mongoose } = require("mongoose");

class CommentController {
  addComment = async (req, res, next) => {
    try {
      let data = req.body;

      if (!data.comment) {
        next({
          status: 400,
          msg: "Empty comment.",
        });
        return;
      }
      let currentPost = await Post.findById(req.params.postId);
      data.user = req.authUser._id;
      data.postId = req.params.postId;
      let comment = new Comment(data);
      let ack = await comment.save();

      //update post after commenting
      await Post.updateOne({ _id: req.params.postId }, { $push: { comments: comment._id } });
      if (ack) {
        res.json({
          result: comment,
          msg: "Comment created succesfully",
          status: true,
        });
      } else {
        next({
          status: 500,
          msg: "Comment cannot be created.",
        });
      }
    } catch (err) {}
  };

  getAllCommentsForPost = async (req, res, next) => {
    try {
      let comments = await Comment.find({ postId: req.params.postId }).populate("user");
      res.json({
        result: comments,
        msg: "All Comments fetched.",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      let currentUser = req.authUser;

      let currentComment = await Comment.findById(req.params.commentId);

      if (
        currentComment.user._id.toString() === currentUser._id.toString() ||
        currentUser.role.includes("admin")
      ) {
        let result = await Comment.findByIdAndDelete(req.params.commentId);
        await Post.updateOne(
          { _id: req.params.postId },
          { $pull: { comments: req.params.commentId } }
        );
        if (result) {
          res.json({
            result: result,
            msg: "Comment deleted succesfully",
            status: true,
          });
        } else {
          next({
            msg: "Comment could not be found.",
            status: 400,
          });
        }
      } else {
        next({
          status: 401,
          msg: "Unauthorized",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  updateComment = async (req, res, next) => {
    try {
      let currentUser = req.authUser;
      let currentComment = await Comment.findById(req.params.commentId);

      // if(currentUser._id===currentComment.user._id)
      let data = req.body;

      if (!data.comment) {
        next({
          status: 400,
          msg: "Empty comment.",
        });
        return;
      }
      if (currentComment.user._id.toString() === currentUser._id.toString()) {
        let updatedComment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          { $set: data },
          { new: true }
        );

        res.json({
          result: updatedComment,
          msg: "Comment succesfully updated",
          status: true,
        });
      } else {
        next({
          status: 401,
          msg: "Unauthorized",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentController;
