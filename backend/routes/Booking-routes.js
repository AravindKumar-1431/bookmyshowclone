const express = require("express");

const {
  getBooking,
  deleteBooking,
} = require("../controllers/Booking-controllers");
const bookingrouter = express.Router();

bookingrouter.post("/", getBooking);
bookingrouter.delete("/:id", deleteBooking);

module.exports = { bookingrouter };
