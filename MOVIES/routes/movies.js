const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { userMovies: userMovies });
});

router.get("/create-movie", (req, res) => {
  res.render("create-movie");
});

router.post("/create-movie", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const genre = req.body.genre;
  const posterURL = req.body.posterURL;

  const userMovie = {
    movieId: userMovies.length + 1,
    title: title,
    description: description,
    genre: genre,
    posterURL: posterURL,
  };

  userMovies.push(userMovie);

  res.redirect("/movies");
});

router.post("/delete-movie", (req, res) => {
  const movieId = req.body.movieId;
  userMovies = userMovies.filter((userMovie) => userMovie.movieId != movieId);
  res.redirect("/movies");
});

router.post("/genre", (req, res) => {
  const genre = req.body.genre;
  console.log(genre);

  userMovies = userMovies.filter((userMovie) => userMovie.genre == genre);
  console.log(userMovies);
  res.redirect("/movies");
});

router.post("/more-details", (req, res) => {
  res.render("more-details", { userMovies: userMovies });
});

router.get("/more-details", (req, res) => {
  res.render("more-details");
});

module.exports = router;
