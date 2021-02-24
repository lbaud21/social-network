const { body, validationResult } = require("express-validator");
const postValidationRules = () => {
  return [
    body("title", "A title is required").notEmpty(),
    body("title", "Title should be between 4 to 150 characters").isLength({
      min: 4,
      max: 150,
    }),
  ];
};

const postValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    //.isEmpty et .array() sont des méthodes propres à l'objet "Result" de express-validator
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  postValidationRules,
  postValidation,
};
