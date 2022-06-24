app.get("/", (req, res) => {});

const blog = models.Blog.build({
  title: "Why is my brain not working",
  body: "Need to sleep",
  category: "Burning Questions",
});

models.Blog.findAll().then((blogs) => console.log(blogs)); //retreive all records and display on console

blog.save().then((persistedBlog) => {
  console.log(persistedBlog);
});

models.Blog.findByPk(3).then((blogs) => console.log(blogs)); //find by primary key

models.Blog.findAll({
  where: {
    title: "Why is my brain not working",
  },
}).then((blogs) => console.log(blogs)); //find all by column name

models.Blog.findOne({
  where: {
    title: "Why is my brain not working",
  },
}).then((blogs) => console.log(blogs)); //only return one item

models.Blog.update(
  //update a specific blog
  {
    title: "What happened to roger rabbit",
    body: "he was my childhood hero",
    category: "Burning Thoughts",
  },
  {
    where: {
      id: 1,
    },
  }
).then((updatedBlog) => console.log(updatedBlog));

models.Blog.destroy({
  where: {
    id: 3,
  },
}).then((result) => console.log(result)); //destroy a blog
