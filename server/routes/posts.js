const express = require("express");
const router = express.Router();

const { getPosts, createPost } = require("../controllers/posts.js");
const { requireSignin } = require("../controllers/authentication.js");

const { postValidationRules } = require("../validator/postValidationRules.js");
const { validate } = require("../validator/validate.js");

router.get("/", getPosts);
router.post(
  "/post",
  requireSignin,
  postValidationRules(),
  validate,
  createPost
);

module.exports = router;
