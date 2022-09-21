const express = require("express");
const router = express.Router();
const UserController = require("../App/Controllers/userController");
const userCtrlObject = new UserController();
const uploader = require("../App/Middleware/uploadMiddleware");
const authMiddleware = require("../App/Middleware/authMiddleware");
const rbacMiddleware = require("../App/Middleware/rbacMiddleware");

let setDestination = (req, res, next) => {
  req.dest = "user";
  next();
};

router.route("/").get(userCtrlObject.getAllUsers);

router
  .route("/:id")
  .put(setDestination, uploader.single("image"), userCtrlObject.updateUserById)
  .delete(authMiddleware.loginCheck, rbacMiddleware.isAdmin, userCtrlObject.deleteUserById)
  .get(userCtrlObject.getUserById);

router.route("/follow/:id").post(authMiddleware.loginCheck, userCtrlObject.followById);
router.route("/unfollow/:id").post(authMiddleware.loginCheck, userCtrlObject.unfollowById);

module.exports = router;
