const express = require("express");
const { getPosts, createPost } = require("../controllers/posts.js");
const { userValidationRules, validate } = require("../validator/index.js");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", userValidationRules(), validate, createPost);

module.exports = router;
