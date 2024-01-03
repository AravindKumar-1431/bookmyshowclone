const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/User-routes");
const app = express();
//const dotenv=require("dotenv");
app.use(express.json());
app.use("/users", userRouter);

mongoose.connect(
  "mongodb+srv://aravindpatel549:6dqPeb17ETyeZP5a@book-my-show.ru2zonw.mongodb.net/Movies?retryWrites=true&w=majority"
);

app.listen(5000, () => {
  console.log(`db connected  to ${5000}`);
});
