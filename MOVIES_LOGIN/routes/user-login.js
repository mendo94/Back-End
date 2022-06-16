const express = require("express");
const router = express.Router();

// Authenticate user
// function authenticateMiddleware(req, res, next) {
//   if (req.session) {
//     if (req.session.username) {
//       next();
//     } else {
//       res.redirect("/user-login");
//     }
//   } else {
//     res.redirect("/user-login");
//   }
// }
// router.get("/", (req, res) => {
//   res.render("user-login");
// });

router.post("/user-login", (req, res) => {
  const { username, password } = req.body;

  const persistedUser = users.find((user) => {
    return user.username == username && user.password == password;
  });

  if (persistedUser) {
    if (req.session) {
      req.session.username = persistedUser.session;
    }
    res.redirect("/movies");
  } else {
    res.render("user-login", { errorMessage: "Invalid username or password" });
  }
});

// router.get("/user-login", (req, res) => {
//   let username = "";

//   if (req.session) {
//     username = req.session.username;
//   }

//   res.send(`Username is ${username}`);
// });

router.get("/user-login", (req, res) => {
  res.render("user-login");
});

module.exports = router;
