const express = require("express");
const {
  getAllusers,
  userSignup,
  userlogin,
} = require("../controllers/User-controllers");

const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userlogin);

module.exports = userRouter;
