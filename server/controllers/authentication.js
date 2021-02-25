const User = require("../models/user.js");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (userExists)
    return res.status(403).json({
      error: "This email is already associated to an account",
    });

  const user = await new User(req.body);
  await user.save();

  res.status(200).json({
    message: "Signup success, you can log in",
  });
};
