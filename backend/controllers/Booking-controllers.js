const Movies = require("../models/Movies");
const Users = require("../models/Users");
const Bookings = require("../models/Bookings");
const mongoose = require("mongoose");
const getBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movies.findById(movie);
    existingUser = await Users.findById(user);
    console.log(existingMovie, existingUser);
  } catch (err) {
    return next(err);
  }
  let newBooking;
  try {
    newBooking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existinguser.bookings.push(newBooking);
    existingMovie.bookings.push(newBooking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await newBooking.save({ session });

    session.commitTransaction();
    // newBooking = await newBooking.save();
  } catch (e) {
    res.send(e.message);
  }

  if (!newBooking) {
    res.status(400).json({ message: "Something Went Wrong" });
  }
  console.log(newBooking);
  return res.status(201).json({ newBooking });
};

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Booking not found by given id" });
  }
  return res.status(200).json({ message: "Booking deleted successfully" });
};

module.exports = { getBooking, deleteBooking };
