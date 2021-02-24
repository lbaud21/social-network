const mongoose = require("mongoose");
const { v1: uuid1 } = require("uuid");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: { type: Date, default: Date.now },
  updated: Date,
});

//virtual field (only exist logically and are not written in the database)
userSchema
  .virtual("password")
  .set(function (password) {
    //Create a temporary variable named _password
    this._password = password;
    //generate the salt
    this.salt = uuid1();
    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
