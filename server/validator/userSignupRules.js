const { body } = require("express-validator");

exports.userSignupRules = () => {
  return [
    //name is not null
    body("name", "Name is required").notEmpty(),

    //email is not null, valid and between 3 to 50 characters
    body(
      "email",
      "Incorrect email, make sure it contains a @ and an extension"
    ).matches(/.+\@.+\..+/),

    //email is between 3 to 100 characters
    body("email", "Email must be between 3 to 100 characters").isLength({
      min: 3,
      max: 100,
    }),

    //password is not null
    body("password", "Password is required").notEmpty(),

    //password contains at least 6 characters
    body("password", "Password must contain at least 6 characters").isLength({
      min: 6,
    }),

    //password contains at least one upper case letter, one number and one special character
    body(
      "password",
      "Password must contain at least one Upper case letter, one number and one special character"
    ).matches(/(?=.*?[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-])/),
  ];
};
