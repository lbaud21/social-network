import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is equired",
    minlength: 4,
    maxlength: 150,
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 1200,
  },
});

export default mongoose.model("Post", postSchema);
