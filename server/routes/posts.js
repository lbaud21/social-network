const express = require("express");
const { getPosts, createPost } = require("../controllers/posts.js");
// const {
//   postValidationRules,
//   postValidation,
// } = require("../validator/index.js");

const { postValidationRules } = require("../validator/postValidationRules.js");
const { validate } = require("../validator/validate.js");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", postValidationRules(), validate, createPost);

module.exports = router;
