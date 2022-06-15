const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const moviesRouter = require("./routes/movies");

app.use("/css", express.static("css"));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());

app.use("/movies", moviesRouter);
app.use("/", moviesRouter);

global.userMovies = [
  {
    movieId: 1,
    title: "Cat in the Hat",
    description:
      "In this live-action film based on the favorite children's tale, the trouble-making Cat in the Hat (Mike Myers) ",
    genre: "Comedy",
    posterURL:
      "https://m.media-amazon.com/images/M/MV5BMTI5MDU3MTYyMF5BMl5BanBnXkFtZTYwODgyODc3._V1_FMjpg_UX1000_.jpg",
  },
  {
    movieId: 2,
    title: "Holes",
    description:
      "A wrongfully convicted boy is sent to a brutal desert detention camp where he joins the job of digging holes for some mysterious reason.",
    genre: "Family",
    posterURL:
      "https://lumiere-a.akamaihd.net/v1/images/p_holes_19755_8f3e1618.jpeg",
  },
  {
    movieId: 3,
    title: "Peanut Butter Falcon",
    description:
      "set in the world of a modern Mark Twain that begins when Zak (22), a young man with Down syndrome, runs away from the nursing home where he lives to chase his dream of becoming a professional wrestler by attending the wrestling school The Salt Water Redneck.",
    genre: "Adventure",
    posterURL:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQgzoCW9Kqn-U1oXDPe40aWb28zN2FwbBRjmFbr6DZNPdiaLIHh",
  },
];

app.listen(8080, () => {
  console.log("Server is running...");
});
