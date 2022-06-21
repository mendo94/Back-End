const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());

const connectionString =
  "postgres://gafrnveh:WgFbyi6pMFmA7OKnnTsKgokMsKAU2LGH@jelani.db.elephantsql.com/gafrnveh";

const db = pgp(connectionString);

app.get("/", (req, res) => {
  db.any(
    "SELECT post_id, title, body, date_created, date_updated, is_published FROM posts"
  )
    .then((posts) => {
      console.log(posts);
      res.render("index", { posts: posts });
    })
    .catch((error) => {
      res.render("index", { message: "Unable to get data" });
    });
});

app.get("/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  db.one(
    "SELECT post_id, title, body, date_created, date_updated, is_published FROM customers WHERE post_id = $1",
    [postId]
  ).then((post) => {
    res.render("blog-detail", post);
  });
});

app.post("/add-blog", (req, res) => {
  const title = req.body.title; //#9 use db.none to insert the data
  const body = req.body.body;
  // const age = parseInt(req.body.);

  db.none(
    "INSERT INTO blog(title, blog) VALUES($1, $2)",
    [title, blog] //#10 data will be injected in this order
  ).then(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
