import express from "express";
import morgan from "morgan";
import postRoutes from "./routes/posts.js";

//database config
import mongoose from "mongoose";
// load env variables
import dotenv from "dotenv";
dotenv.config();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});
//

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

app.use("/", postRoutes);

app.listen(PORT, () => console.log("Listening on port:", PORT));
