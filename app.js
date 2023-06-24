const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  // console.log(req);
  // Examples of the "req" methods in the README.md file
  res.render("index");
});

// dynamic route
app.get("/users/:username", (req, res) => {
  res.send(req.params);
});

// nested dynamic routes
app.get("/users/:username/books/:bookID", (req, res) => {
  res.send(req.params);
});

// Query String
app.get("/search", (req, res, next) => {
  res.send(req.query);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
