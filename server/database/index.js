const mongoose = require("mongoose");

module.exports = async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(`DB connection error: ${error}`);
  }
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
