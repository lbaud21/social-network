const express = require("express");
const { signup } = require("../controllers/authentication.js");
const { validate } = require("../validator/validate.js");
const { userSignupRules } = require("../validator/userSignupRules.js");

const router = express.Router();

router.post("/signup", userSignupRules(), validate, signup);

module.exports = router;
