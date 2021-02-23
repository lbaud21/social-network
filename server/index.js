const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/posts.js");
const bodyParser = require("body-parser");

//database config
const mongoose = require("mongoose");
// load env variables
const dotenv = require("dotenv");
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
app.use(bodyParser.json()); //or app.use(express.json())
app.use(postRoutes);

app.listen(PORT, () => console.log("Listening on port:", PORT));
