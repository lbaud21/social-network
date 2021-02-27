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
