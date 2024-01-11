const mongoose = require("mongoose");

const AdminsignupSchema = new mongoose.Schema({
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
  AddedMovies: [{ type: String, require: true }],
});

module.exports = mongoose.model("Admin", AdminsignupSchema);
