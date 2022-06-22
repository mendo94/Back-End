const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const mustacheExpress = require("mustache-express");
var bcrypt = require("bcryptjs");
const blogRouter = require("./routes/blog");
// const userRouter = require("./routes/users");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views");
const PORT = 3000;

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use(express.urlencoded());

const connectionString =
  "postgres://gafrnveh:WgFbyi6pMFmA7OKnnTsKgokMsKAU2LGH@jelani.db.elephantsql.com/gafrnveh";

global.db = pgp(connectionString);

app.use("/blog", blogRouter);
app.use("/", blogRouter);
// app.use("/users", userRouter);

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/registration", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

  db.oneOrNone("SELECT user_id FROM user_accounts WHERE username = $1", [
    username,
  ]).then((user) => {
    if (user) {
      res.render("register", {
        message: "Username already exists, pleaes try again!",
      });
    } else {
      bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(password, salt).then((hash) => {
          db.none(
            "INSERT INTO user_accounts(username, password) VALUES($1, $2)",
            [username, hash]
          ).then(() => {
            res.redirect("/user-login");
          });
        });
      });
    }
  });
});

app.get("/user-login", (req, res) => {
  res.render("user-login");
});

app.post("/user-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  db.one(
    "SELECT user_id, username, password FROM user_accounts WHERE username = $1",
    [username]
  ).then((user) => {
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          if (req.session) {
            req.session.user_id = user.user_id;
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

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
