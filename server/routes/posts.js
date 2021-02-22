import express from "express";
import { postsController } from "../controllers/posts.js";

const postRoutes = express.Router();

postRoutes.get("/", postsController);

export default postRoutes;
