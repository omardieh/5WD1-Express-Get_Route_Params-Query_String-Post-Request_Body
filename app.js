const express = require("express");
const app = express();
const hbs = require("hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  // console.log(req);
  // Examples of the "req" methods in the README.md file
  res.render("index");
});

// app.get("/user-data", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });

app.post("/user-data", (req, res) => {
  res.send(req.body);
});

app.get("/login", (req, res) => res.render("login"));
app.post("/login", (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
