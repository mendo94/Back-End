const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
let userTrips = [];

app.use("/css", express.static("css"));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded());

//VIEW ALL TRIPS
app.get("/", (req, res) => {
  res.render("index", {
    allTrips: userTrips,
    trip: "Hawaii",
    imageURL:
      "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    departDate: "07/01/2022",
    returnDate: "08/01/2022",
  });
});

app.get("/create-trip", (req, res) => {
  res.render("create-trip");
});

//CREATE TRIPS
app.post("/create-trip", (req, res) => {
  console.log(req.body);
  const { trip, imageURL, departDate, returnDate } = req.body;

  const userTrip = {
    tripId: userTrips.length,
    trip: trip,
    imageURL: imageURL,
    departDate: departDate,
    returnDate: returnDate,
  };

  userTrips.push(userTrip);

  res.redirect("/");
  console.log(userTrip.tripId);
});

app.post("/delete-trip", (req, res) => {
  const removeTrip = req.body.tripId;

  for (let i = 0; i < userTrips.length; i++) {
    if ((i = userTrips[i])) {
      userTrips.splice(i, 1);
    }
  }
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("Server is running...");
});

// id: userTrips.length,
