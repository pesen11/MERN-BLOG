const AuthService = require("../Services/authService");
let User = require("../Models/userModel");
const bcrypt = require("bcrypt");

class AuthController {
  constructor() {
    this.authServiceObject = new AuthService();
  }
  register = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      //validate registration and do registration
      let registrationError = this.authServiceObject.registrationValidate(data, false);

      let existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        next({
          status: 400,
          msg: "User already exists.",
        });
        return;
      }

      let hash = bcrypt.hashSync(data.password, 10);
      data.password = hash;

      if (data.role) {
        data.role = data.role.split(",");
      } else {
        data.role = ["author"];
      }

      let user = new User(data);

      user
        .save()
        .then((ack) => {
          res.json({
            result: user,
            msg: "User registered succesfully",
            status: true,
          });
        })
        .catch((err) => {
          next({
            status: 500,
            msg: err,
          });
        });
    } catch (err) {
      console.log(err);
      next({
        status: 400,
        msg: err,
      });
    }
  };

  login = async (req, res, next) => {
    let data = req.body;

    try {
      let loginValidate = this.authServiceObject.loginValidate(data);

      let user = await User.findOne({ email: data.email });
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          let accessToken = this.authServiceObject.generateAccessToken({
            id: user._id,
            name: user.name,
            role: user.role,
          });
          await res.json({
            result: { user: user, accessToken: accessToken },
            msg: "Logged in Succefully",
            status: true,
          });
        } else {
          throw "Credentials do not match.";
        }
      } else {
        throw "User does not exist.";
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };
}

module.exports = AuthController;
