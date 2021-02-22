import Post from "../models/posts.js";

export const getPosts = (req, res) => {
  res.json({
    posts: [{ title: "first post" }, { title: "second post" }],
  });
};

export const createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      post: data,
    });
  });
};
