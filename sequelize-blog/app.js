const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const { Op } = require("sequelize");
const models = require("./models");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());

// app.get("/", (req, res) => {});

// const blog = models.Blog.build({
//   title: "Why is my brain not working",
//   body: "Need to sleep",
//   category: "Burning Questions",
// });

// models.Blog.findAll().then((blogs) => console.log(blogs)); //retreive all records and display on console

// blog.save().then((persistedBlog) => {
//   console.log(persistedBlog);
// });

// models.Blog.findByPk(3).then((blogs) => console.log(blogs)); //find by primary key

// models.Blog.findAll({
//   where: {
//     title: "Why is my brain not working",
//   },
// }).then((blogs) => console.log(blogs)); //find all by column name

// models.Blog.findOne({
//   where: {
//     title: "Why is my brain not working",
//   },
// }).then((blogs) => console.log(blogs)); //only return one item

// models.Blog.update(
//   //update a specific blog
//   {
//     title: "What happened to roger rabbit",
//     body: "he was my childhood hero",
//     category: "Burning Thoughts",
//   },
//   {
//     where: {
//       id: 1,
//     },
//   }
// ).then((updatedBlog) => console.log(updatedBlog));

// models.Blog.destroy({
//   where: {
//     id: 3,
//   },
// }).then((result) => console.log(result)); //destroy a blog

app.get("/", async (req, res) => {
  const blogs = await models.Blog.findAll({});
  res.render("index", { blogs: blogs });
});

app.get("/create-blog", (req, res) => {
  res.render("create-blog");
});

app.post("/create-blog", (req, res) => {
  const { title, body, category } = req.body;

  const blog = models.Blog.build({
    title: title,
    body: body,
    category: category,
  });
  blog.save().then((savedBlog) => {
    res.redirect("/");
  });
});

app.get("/delete-blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const _ = await models.Blog.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
});

app.get("/update-blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const blog = await models.Blog.findByPk(id);

  res.render("update-blog", blog.dataValues);
});

app.post("/update-blog", async (req, res) => {
  const { id, title, body, category } = req.body;

  const result = await models.Blog.update(
    {
      title: title,
      body: body,
      category: category,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/");
});

app.listen(2080, () => {
  console.log("Server is running...");
});
