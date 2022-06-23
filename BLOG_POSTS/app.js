const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/users");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views");
const PORT = 3000;

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use(express.urlencoded());

app.use(
  session({
    secret: "THISSECRETKEY",
    resave: false,
    saveUninitialized: false,
  })
);

const connectionString =
  "postgres://gafrnveh:WgFbyi6pMFmA7OKnnTsKgokMsKAU2LGH@jelani.db.elephantsql.com/gafrnveh";

global.db = pgp(connectionString);

app.use("/blog", blogRouter);
app.use("/", blogRouter);
app.use("/users", userRouter);

app.post("/add-comment", (req, res) => {
  const comment = req.body.comment;

  db.none("INSERT INTO comments(comment) VALUES($1)", [comment]).then(() => {
    res.redirect("/blog");
  });
});

app.get("/add-comment", (req, res) => {
  res.render("add-comment");
});

app.get("/", (req, res) => {
  db.any("SELECT comment FROM comments WHERE comment = $1", [comment])
    .then((comments) => {
      console.log(comments);
      res.render("add-comment", { comments: comments });
    })
    .catch((error) => {
      res.render("add-comment", { message: "Unable to get data" });
    });
});

app.get("/my-profile", (req, res) => {
  const user_id = req.session.user_id;
  console.log(user_id);

  db.any("SELECT post_id, title, body FROM posts WHERE user_id = $1", [
    user_id,
  ]).then((posts) => {
    // res.render("my-profile", { posts: posts });
    console.log(posts);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
