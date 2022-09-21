const router = require("express").Router();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbacMiddleware = require("../App/Middleware/rbacMiddleware");
const CommentController = require("../App/Controllers/commentController");
const cmntCtrlObj = new CommentController();
const uploader = require("../App/Middleware/uploadMiddleware");

router
  .route("/:postId")
  .post(authMiddleware.loginCheck, rbacMiddleware.isLoggedIn, cmntCtrlObj.addComment)
  .get(cmntCtrlObj.getAllCommentsForPost);

router
  .route("/:postId/:commentId")
  .delete(authMiddleware.loginCheck, cmntCtrlObj.deleteComment)
  .put(authMiddleware.loginCheck, cmntCtrlObj.updateComment);

module.exports = router;
