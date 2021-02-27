const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/authentication.js");
const userRoutes = require("./routes/user.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./database/index.js");
const dotenv = require("dotenv");

// load env variables//
dotenv.config();

//Connect database//
connectDatabase();

//Create express app//
const app = express();

//Define port//
const PORT = process.env.PORT || 5000;

//Middlewares//
app.use(morgan("dev"));
app.use(bodyParser.json()); //or app.use(express.json())
app.use(cookieParser());

app.use(postRoutes);
app.use(authRoutes);
app.use(userRoutes);

//express-jwt error catching middleware
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "Unauthorized!",
    });
  }
});

//Listen
app.listen(PORT, () => console.log("Listening on port:", PORT));
