const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/authentication.js");
const bodyParser = require("body-parser");

//database config
const connectDatabase = require("./database/index.js");
// load env variables
const dotenv = require("dotenv");
dotenv.config();

connectDatabase();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json()); //or app.use(express.json())

app.use(postRoutes);
app.use(authRoutes);

app.listen(PORT, () => console.log("Listening on port:", PORT));
