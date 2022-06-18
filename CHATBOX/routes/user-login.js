const express = require("express");
const router = express.Router();

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
