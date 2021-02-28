const User = require("../models/user.js");
const _ = require("lodash");

exports.userById = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    //adds profile object containing user info in req object
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
};

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ users });
  }).select("name email created updated");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  let user = req.profile;

  user = _.extend(user, req.body);
  user.updated = Date.now();

  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};
