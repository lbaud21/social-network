import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const postRoutes = express.Router();

postRoutes.get("/", getPosts);
postRoutes.post("/post", createPost);

export default postRoutes;
