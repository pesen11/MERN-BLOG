const router = require("express").Router();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbacMiddleware = require("../App/Middleware/rbacMiddleware");
const uploader = require("../App/Middleware/uploadMiddleware");
const PostController = require("../App/Controllers/postController");
const postCtrlObj = new PostController();

let setDestination = (req, res, next) => {
  req.dest = "post";
  next();
};

router.route("/").get(postCtrlObj.getAllPosts);

router
  .route("/addPost")
  .post(
    setDestination,
    uploader.single("image"),
    authMiddleware.loginCheck,
    rbacMiddleware.isAuthor,
    postCtrlObj.addPost
  );

router.route("/uploadImage").post(setDestination, uploader.single("upload"), (req, res) => {
  res.json({
    uploaded: "true",
    url: "http://localhost:8080/uploads/post" + `/${req.imgName}`,
  });
});

router
  .route("/:id")
  .get(postCtrlObj.getPostbyId)
  .delete(authMiddleware.loginCheck, rbacMiddleware.isAdminAuthor, postCtrlObj.deletePostById)
  .put(
    setDestination,
    uploader.single("image"),
    authMiddleware.loginCheck,
    rbacMiddleware.isAdminAuthor,
    postCtrlObj.updatePost
  );

router
  .route("/:id/toggleStar")
  .post(authMiddleware.loginCheck, rbacMiddleware.isAdminAuthor, postCtrlObj.toggleStars);

module.exports = router;
