const jwt = require("jsonwebtoken");
const CONFIG = require("../../Config/config");

class AuthService {
  registrationValidate = (data, isEdit = false) => {
    let err_msg = {};
    if (!data.name) {
      err_msg["name"] = "Name is required.";
    }
    if (!isEdit) {
      if (!data.email) {
        err_msg["email"] = "Email is required";
      }
      if (!data.password) {
        err_msg["password"] = "Password is required";
      }
    }

    if (!data.about) {
      err_msg["about"] = "You need a short description about yourself in about.";
    }

    if (Object.keys(err_msg).length) {
      throw err_msg;
    } else {
      return data;
    }
  };

  loginValidate = (data) => {
    let err_msg = {};

    if (!data.email) {
      err_msg["email"] = "Email is required";
    }

    if (!data.password) {
      err_msg["password"] = "Password is required";
    }

    if (Object.keys(err_msg).length) {
      throw err_msg;
    } else {
      return data;
    }
  };

  generateAccessToken = (data) => {
    let token = jwt.sign(data, CONFIG.JWT_SECRET);
    return token;
  };
}

module.exports = AuthService;
