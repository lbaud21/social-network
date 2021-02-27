const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

exports.signup = async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (userExists)
    return res.status(403).json({
      error: "This email is already associated to an account",
    });

  const user = new User(req.body);
  await user.save();

  res.status(200).json({
    message: "Signup success, you can log in",
  });
};

exports.signin = (req, res) => {
  //find the user based on his/her email
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    //if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: "This email is not linked to an account",
      });
    }

    //if user is found, make sure the email and password match
    //use authenticate method of user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date(Date.now() + 3600) });

    //return response with user and token to frontend
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
