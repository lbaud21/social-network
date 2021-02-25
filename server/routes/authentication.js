const express = require("express");
const { signup } = require("../controllers/authentication.js");
// const {
//   postValidationRules,
//   postValidation,
// } = require("../validator/index.js");

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
