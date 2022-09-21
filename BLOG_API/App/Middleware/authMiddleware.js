const jwt = require("jsonwebtoken");
const CONFIG = require("../../Config/config");
const User = require("../Models/userModel");

const loginCheck = async (req, res, next) => {
  let token = null;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }
  if (req.headers["x-xsrf-token"]) {
    token = req.headers["x-xsrf-token"];
  }

  if (!token) {
    next({
      status: 401,
      msg: "Unauthorized",
    });
  } else {
    try {
      let parts = token.split(" ");
      token = parts[parts.length - 1];
      let data = jwt.verify(token, CONFIG.JWT_SECRET);
      if (data) {
        let user = await User.findById(data.id);
        if (user) {
          req.authUser = user;
          next();
        } else {
          next({
            status: 403,
            msg: "Access denied",
          });
        }
      } else {
        next({
          status: 401,
          msg: "Unauthorized",
        });
      }
    } catch (errr) {
      next({
        status: 401,
        msg: "Unauthorized",
      });
    }
  }
};

module.exports = { loginCheck };
