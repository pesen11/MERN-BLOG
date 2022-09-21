const User = require("../Models/userModel");
const AuthService = require("../Services/authService");

class UserController {
  constructor() {
    this.authServiceObject = new AuthService();
  }

  getAllUsers = async (req, res, next) => {
    try {
      let filters = {};
      if (req.query.role && req.query.role !== "all") {
        filters = {
          role: req.query.role,
        };
      }
      let allUsers = await User.find(filters);
      await res.json({
        result: allUsers,
        msg: "All users fetched",
        status: true,
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  updateUserById = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let registrationError = this.authServiceObject.registrationValidate(data, true);
      if (data.role) {
        data.role = data.role.split(".");
      }
      let updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: data,
        },
        { new: true }
      );
      res.json({
        result: updatedUser,
        msg: "User updated succesfully",
        status: true,
      });
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      let result = await User.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "User deleted succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "User not found.",
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  getUserById = async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id);
      if (user) {
        res.json({
          result: user,
          msg: "User fetched succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "User does not exists or may have already been deleted.",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  followById = async (req, res, next) => {
    try {
      let currentUser = await User.findById(req.authUser.id);
      if (
        currentUser.following.map((user) => user.toString()).includes(req.params.id) ||
        req.params.id == currentUser._id.toString()
      ) {
        next({
          stauts: 400,
          msg: "Already followed user or trying to follow self",
        });
        return;
      }

      await User.findByIdAndUpdate(req.params.id, { $push: { followers: currentUser._id } });
      let addedFollowing = await User.findByIdAndUpdate(
        currentUser._id,
        { $push: { following: req.params.id } },
        { new: true }
      );

      res.json({
        result: addedFollowing,
        msg: "Followed.",
        status: true,
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  unfollowById = async (req, res, next) => {
    try {
      let currentUser = await User.findById(req.authUser.id);
      // if (
      //   currentUser.following.map((user) => user.toString()).includes(req.params.id) ||
      //   req.params.id == currentUser._id.toString()
      // ) {
      //   next({
      //     stauts: 400,
      //     msg: "Already followed user or trying to follow self",
      //   });
      //   return;
      // }

      let ack1 = await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: currentUser._id },
      });
      let ack2 = await User.findByIdAndUpdate(
        currentUser._id,
        { $pull: { following: req.params.id } },
        { new: true }
      );

      if (ack1 && ack2) {
        res.json({
          result: ack2,
          msg: "UnFollowed.",
          status: true,
        });
      } else {
        next({
          msg: "Already unfollowed or invalid user",
          status: 400,
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };
}

module.exports = UserController;
