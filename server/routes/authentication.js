const express = require("express");
const { signup, signin, signout } = require("../controllers/authentication.js");
const { validate } = require("../validator/validate.js");
const { userSignupRules } = require("../validator/userSignupRules.js");
const { userById } = require("../controllers/user.js");

const router = express.Router();

router.post("/signup", userSignupRules(), validate, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route containing :userId will execute userById
router.param("userId", userById);

module.exports = router;
