const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//store created to dos
const todos = [];

app.post("/todos", (req, res) => {
  console.log(req.body);
  const { title, priority, dateCreated } = req.body;

  todos.push({ title: title, priority: priority, date: dateCreated });

  res.json({ success: true, message: "Todo was added" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

//Start server
app.listen(3000, () => {
  console.log("Server is running....");
});
