const { body } = require("express-validator");

exports.postValidationRules = () => {
  return [
    body("title", "A title is required").notEmpty(),
    body("title", "Title should be between 4 to 150 characters").isLength({
      min: 4,
      max: 150,
    }),
  ];
};
