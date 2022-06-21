const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const moviesRouter = require("./routes/movies");
const cors = require("cors");
const session = require("express-session");
const { use } = require("./routes/movies");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views");
const PORT = process.env.PORT || 8080;

// const loginRouter = require("./routes/user-login");

app.use(express.static("static"));
app.use("/js", express.static("static"));
app.use("/css", express.static("static"));
app.use("/img", express.static("static"));

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use(express.urlencoded());

// Initializes the session
app.use(
  session({
    secret: "THISSECRETKEY", //make the hash more distinguishable
    saveUninitialized: true, //cookies will save
    resave: true,
  })
);

function authenticateMiddleware(req, res, next) {
  if (req.session) {
    if (req.session.username) {
      next();
    } else {
      res.redirect("/user-login");
    }
  } else {
    res.redirect("/user-login");
  }
}

// app.use("/user-login", loginRouter);
app.use("/movies", authenticateMiddleware, moviesRouter);
app.use("/", moviesRouter);

app.use(cors());
app.use(express.json());

global.users = [
  {
    userId: 1,
    username: "pappy",
    password: "1",
  },
  {
    userId: 2,
    username: "happy",
    password: "2",
  },
];

app.post("/registration", (req, res) => {
  let { userId, username, password } = req.body;

  const user = {
    userId: users.length + 1,
    username: username,
    password: password,
  };

  users.push(user);

  res.redirect("/user-login");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/user-login", (req, res) => {
  let { username, password } = req.body;
  console.log(username);
  console.log(password);

  const persistedUser = users.find((user) => {
    return user.username == username && user.password == password;
  });

  if (persistedUser) {
    if (req.session) {
      req.session.username = persistedUser.username;
    }
    res.redirect("/movies");
  } else {
    res.render("user-login", { errorMessage: "Invalid username or password" });
  }
});

app.get("/user-login", (req, res) => {
  res.render("user-login");
});

app.post("/logout", (req, res) => {
  // destroy session data
  if (req.session) {
    req.session.destroy();
  }

  res.redirect("/user-login");
});

chatUsers = {};

io.on("connection", (socket) => {
  console.log("The user is connected");
  socket.on("new-user", (name) => {
    chatUsers[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: chatUsers[socket.id],
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", chatUsers[socket.id]);
      delete chatUsers[socket.id];
    });
  });
});

app.post("/chatroom", (req, res) => {
  res.sendFile(__dirname + "/views/chatroom.html");
});

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
  {
    movieId: 4,
    title: "Hereditary",
    description:
      "daughter and grandchildren begin to unravel cryptic and increasingly terrifying secrets about their ancestry, trying to outrun the sinister fate they have inherited.",
    genre: "Horror",
    posterURL:
      "https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_FMjpg_UX1000_.jpg",
  },
  {
    movieId: 5,
    title: "The Witch",
    description:
      "panic and despair envelops a farmer, his wife and their children when youngest son Samuel suddenly vanishes",
    genre: "Horror",
    posterURL: "https://i.ebayimg.com/images/g/YkYAAOSwQYZWumIk/s-l400.jpg",
  },
];

http.listen(8080, () => {
  console.log("Server is running...");
});
