const express = require("express");
const app = express();
const hbs = require("hbs");
const { body, validationResult } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// # Logger : custom middleware
app.use(activityLogger);
function activityLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/another-route", (req, res) => {
  res.send("Hello, another route!");
});

// # Request Validation
app.get("/register", (req, res) => {
  res.render("register");
});
const validateRequest = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

app.post("/register", validateRequest, (req, res) => {
  res.send("Process valid registration request");
});

// trigger error route :
app.get("/trigger-error", (req, res, next) => {
  try {
    // Attempt to access an undefined variable, which will throw an error
    const undefinedVariable = someUndefinedVariable;
    res.send("This will never be executed");
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
});

// # handle controlled forwarded Errors
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
};
app.use(errorHandlerMiddleware);

// # Handling Nonexistent Routes
const handleNonExistingRoute = (req, res) => {
  res.status(404).send("Page not found");
};
app.use(handleNonExistingRoute);

app.listen(3000, () => console.log("App listening on port 3000!"));
