const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema({
  movie: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: Date,
    require: true,
  },
  seatNumber: {
    type: Number,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Booking", BookingsSchema);
