const Post = require("../models/posts.js");

exports.getPosts = async (req, res) => {
  try {
    //.find return all the posts and .select allows to select only the fields in the posts we're interested in
    const posts = await Post.find().select("_id title body");
    //by default, the server return 200 if everything is ok, so we could delete res.status(200)
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post.save().then((data) => {
    res.status(200).json({
      post: data,
    });
  });
};
