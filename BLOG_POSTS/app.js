const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const mustacheExpress = require("mustache-express");
const blogRouter = require("./routes/blog");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());

const connectionString =
  "postgres://gafrnveh:WgFbyi6pMFmA7OKnnTsKgokMsKAU2LGH@jelani.db.elephantsql.com/gafrnveh";

global.db = pgp(connectionString);

app.use("/blog", blogRouter);
app.use("/", blogRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
