const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/User-routes");
const { adminRouter } = require("./routes/Admin-routes");
const { moviesRouter } = require("./routes/Movie-routes");
const { bookingrouter } = require("./routes/Booking-routes");
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/movies", moviesRouter);
app.use("/booking", bookingrouter);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
mongoose.connect(
  "mongodb+srv://aravindpatel549:6dqPeb17ETyeZP5a@book-my-show.ru2zonw.mongodb.net/Movies?retryWrites=true&w=majority"
);

app.listen(5000, () => {
  console.log(`db connected  to ${5000}`);
});
