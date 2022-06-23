const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.render("index", {
//     username: req.session.user.username,
//   });
// });

router.get("/", (req, res) => {
  const userId = req.session.user.user_id;

  db.any(
    "SELECT post_id, title, body, date_created, date_updated, is_published, user_id FROM posts WHERE user_id = $1",
    [userId]
  )
    .then((posts) => {
      console.log(posts);
      res.render("index", { posts: posts });
    })
    .catch((error) => {
      res.render("index", { message: "Unable to get data" });
    });
});

router.post("/add-blog", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  // const username = req.session.username;
  const userId = req.session.user.user_id;
  console.log(userId);
  // const age = parseInt(req.body.);

  db.none("INSERT INTO posts(title, body, user_id) VALUES($1, $2, $3)", [
    title,
    body,
    userId,
  ]).then(() => {
    res.redirect("/blog");
  });
});

router.get("/add-blog", (req, res) => {
  res.render("add-blog");
});

router.post("/delete-blog", (req, res) => {
  const post_id = parseInt(req.body.post_id);
  db.none("DELETE FROM posts WHERE post_id = $1", [post_id]).then(() => {
    res.redirect("/");
  });
});

module.exports = router;
