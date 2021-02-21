import express from "express";
import { getPosts } from "./routes/posts.js";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  getPosts(req, res);
});

app.listen(PORT, () => console.log("Listening on port:", PORT));
