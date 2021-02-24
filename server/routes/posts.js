const express = require("express");
const { getPosts, createPost } = require("../controllers/posts.js");
const {
  postValidationRules,
  postValidation,
} = require("../validator/index.js");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", postValidationRules(), postValidation, createPost);

module.exports = router;
