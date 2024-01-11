const jwt = require("jsonwebtoken");
const Movies = require("../models/Movies");
const addMovies = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  console.log(extractedToken);
  let adminId;

  jwt.verify(extractedToken, process.env.secretkey, (err, decrypted) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { title, description, actors, releaseDate, posterUrl, featured } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: `Invalid Inputs` });
  }

  let movies = new Movies({
    title,
    description,
    actors,
    releaseDate,
    posterUrl,
    admin: adminId,
  });

  await movies.save();

  return res.status(200).send("Movie added successfully");
};

const getallmovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movies.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request failed" });
  }
  return res.status(200).json({ movies });
};

const getmoviebyid = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movies.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "invalid movie" });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return console.log(err);
  }
};
module.exports = { addMovies, getallmovies, getmoviebyid };
