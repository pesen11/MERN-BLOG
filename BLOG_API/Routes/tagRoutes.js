const router = require("express").Router();
const TagController = require("../App/Controllers/tagController");
const tagCtrlObj = new TagController();
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbacMiddleware = require("../App/Middleware/rbacMiddleware");
const uploader = require("../App/Middleware/uploadMiddleware");
const { route } = require("./userRoutes");

let setDestination = (req, res, next) => {
  req.dest = "tag";
  next();
};

router.route("/").get(tagCtrlObj.getAllTags);

router
  .route("/addTag")
  .post(
    setDestination,
    uploader.single("image"),
    authMiddleware.loginCheck,
    rbacMiddleware.isAdmin,
    tagCtrlObj.addTag
  );

router
  .route("/:id")
  .get(tagCtrlObj.getTagById)
  .put(
    setDestination,
    uploader.single("image"),
    authMiddleware.loginCheck,
    rbacMiddleware.isAdmin,
    tagCtrlObj.updateTag
  )
  .delete(authMiddleware.loginCheck, rbacMiddleware.isAdmin, tagCtrlObj.deleteTagById);

module.exports = router;
