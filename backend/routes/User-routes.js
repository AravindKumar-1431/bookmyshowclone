const express = require("express");
const { getAllusers } = require("../controllers/User-controllers");

const userRouter = express.Router();

userRouter.get("/", getAllusers);

module.exports = userRouter;
