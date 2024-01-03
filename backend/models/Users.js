const mongoose = require("mongoose");

const usersignupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  confrimpassword: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Users", usersignupSchema);
