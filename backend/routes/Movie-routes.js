const express = require("express");
const {
  addMovies,
  getallmovies,
  getmoviebyid,
} = require("../controllers/Movies-controllers");

const moviesRouter = express.Router();

moviesRouter.post("/", addMovies);
moviesRouter.get("/", getallmovies);
moviesRouter.get("/:id", getmoviebyid);
module.exports = { moviesRouter };
