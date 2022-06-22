const express = require("express");
const userRouter = express.Router();

// router.get("/", (req, res) => {
//   db.any(
//     "SELECT post_id, title, body, date_created, date_updated, is_published FROM posts"
//   )
//     .then((posts) => {
//       console.log(posts);
//       res.render("index", { posts: posts });
//     })
//     .catch((error) => {
//       res.render("index", { message: "Unable to get data" });
//     });
// });

userRouter.get("/user-login", (req, res) => {
  res.render("user-login");
});

userRouter.get("/registration", (req, res) => {
  res.render("registration");
});

userRouter.post("/registration", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

  res.send();
  db.oneOrNone("SELECT user_id FROM user_accounts WHERE username = $1", [
    username,
  ]).then((user) => {
    if (user) {
      res.render("register", {
        message: "Username already exists, pleaes try again!",
      });
    }
  });
});

module.exports = userRouter;
