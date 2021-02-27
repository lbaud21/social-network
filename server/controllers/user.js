const User = require("../models/user.js");

exports.userById = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    //adds profile object containing user info in req object
    req.profile = user;
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth_id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
};
