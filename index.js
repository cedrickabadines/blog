import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

let post = [];
let postBtn = false;
// const blogList = [];

app.get("/", (req, res) => {
  postBtn = false;
  res.render("index.ejs", {
    post: post,
    saveOrUpdate: "Save",
  });
});

app.post("/create-post", (req, res) => {
  postBtn = req.body.openBtn;
  console.log(postBtn);

  res.render("index.ejs", {
    postButton: postBtn,
    post: post,
    saveOrUpdate: "Save",
  });
});

app.post("/save", (req, res, next) => {
  let redirect = false;

  let index = req.body.index;

  if (index) {
    console.log("Will update this");
    console.log("Index is: " + index);

    let idx = post[index];
    idx.name = req.body.theName;
    idx.description = req.body.description;

    redirect = true;
    res.render("index.ejs", {
      post: post,
      redirect: redirect,
      saveOrUpdate: "Save",
    });

    console.log("Updated!");
  } else {
    const blog = {};
    const createBlog = Object.create(blog);

    createBlog.name = req.body.theName;
    createBlog.description = req.body.description;

    post.push(createBlog);

    console.log("The blog " + createBlog.name + " | " + createBlog.description);
    redirect = true;
    res.render("index.ejs", {
      post: post,
      redirect: redirect,
      saveOrUpdate: "Save",
    });

    console.log("Saved!");
    let noneOrYeps = index ? "Yeps" : "None";
    console.log("Index is: " + noneOrYeps);
  }

  redirect = false;
});

app.get("/update", (req, res, send) => {
  postBtn = true;
  const index = req.query.index;
  console.log("Update index is: " + index);

  const thePost = post[index];
  // console.log("Post Index is " + thePost.name);

  res.render("index.ejs", {
    post: post,
    postButton: postBtn,
    name: thePost.name,
    description: thePost.description,
    saveOrUpdate: "Update",
    update: true,
    idx: index,
  });
  postBtn = false;
});

app.get("/delete", (req, res, next) => {
  let index = req.query.i;
  console.log("Delete index is: " + index);

  post.splice(index, 1);

  res.render("index.ejs", {
    post: post,
    saveOrUpdate: "Save",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
