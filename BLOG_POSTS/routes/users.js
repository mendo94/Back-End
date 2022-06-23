const express = require("express");
const userRouter = express.Router();
var bcrypt = require("bcryptjs");

userRouter.get("/registration", (req, res) => {
  res.render("registration");
});

userRouter.post("/registration", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

  db.oneOrNone("SELECT id FROM user_accounts WHERE username = $1", [
    username,
  ]).then((user) => {
    if (user) {
      res.render("registration", {
        message: "Username already exists, pleaes try again!",
      });
    } else {
      bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(password, salt).then((hash) => {
          db.none(
            "INSERT INTO user_accounts(username, password) VALUES($1, $2)",
            [username, hash]
          ).then(() => {
            res.redirect("/users/user-login");
          });
        });
      });
    }
  });
});

userRouter.get("/user-login", (req, res) => {
  res.render("user-login");
});

userRouter.post("/user-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  db.one(
    "SELECT id, username, password FROM user_accounts WHERE username = $1",
    [username]
  ).then((user) => {
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          if (req.session) {
            req.session.id = user.id;
          }
          res.redirect("/blog");
        } else {
          res.render("login", { message: "Invalid username or password!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

userRouter.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect("/users/user-login");
});

module.exports = userRouter;
