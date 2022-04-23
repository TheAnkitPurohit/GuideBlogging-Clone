require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

// bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

// Passport
const passport = require("passport");
const session = require("express-session");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const routerPath = require("./routes/router");
app.use("/", routerPath);

app.listen(port, () => {
  console.log("Blog is open on port " + port);
});
