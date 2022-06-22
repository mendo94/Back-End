const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

// router.get("/:post_id", (req, res) => {
//   const post_id = parseInt(req.params.post_id);
//   db.one(
//     "SELECT post_id, title, body, date_created, date_updated, is_published FROM posts WHERE post_id = $1",
//     [post_id]
//   ).then((post) => {
//     res.render("blog-detail", post);
//   });
// });

router.post("/delete-blog", (req, res) => {
  const post_id = parseInt(req.body.post_id);
  db.none("DELETE FROM posts WHERE post_id = $1", [post_id]).then(() => {
    res.redirect("/");
  });
});

router.post("/add-blog", (req, res) => {
  const title = req.body.title; //#9 use db.none to insert the data
  const body = req.body.body;
  // const age = parseInt(req.body.);

  db.none(
    `INSERT INTO posts (title, body) VALUES('${title}', '${body}')`
    //#10 data will be injected in this order
  ).then(() => {
    res.redirect("/");
  });
});

router.get("/add-blog", (req, res) => {
  res.render("add-blog");
});

module.exports = router;
