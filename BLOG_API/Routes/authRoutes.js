const router = require("express").Router();
const { model } = require("mongoose");
const AuthController = require("../App/Controllers/authController");
const authCtrlObject = new AuthController();
const uploader = require("../App/Middleware/uploadMiddleware");

let setDestination = (req, res, next) => {
  req.dest = "user";
  next();
};

router.route("/register").post(setDestination, uploader.single("image"), authCtrlObject.register);

router.route("/login").post(authCtrlObject.login);

module.exports = router;
