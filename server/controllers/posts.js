const Post = require("../models/posts.js");

exports.getPosts = (req, res) => {
  res.json({
    posts: [{ title: "first post" }, { title: "second post" }],
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post.save().then((data) => {
    res.status(200).json({
      post: data,
    });
  });
};
