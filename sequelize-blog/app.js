const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const { Op } = require("sequelize");
const models = require("./models");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const blogs = await models.Blog.findAll({});
  res.render("index", { blogs: blogs });
});

// app.get("/update-blog/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   const blog = await models.Blog.findByPk(id);

//   res.render("update-blog", blog.dataValues);
// });

app.post("/filter", async (req, res) => {
  const { title, body, category } = req.body;

  const categories = await models.Blog.findAll({
    where: {
      category: {
        [Op.iLike]: category,
      },
    },
  });
  console.log(categories);
  res.render("index", { categories: categories });
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
