"use strict";

//Mukaji Mweni Rachel Kambala u23559129 position-24

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
app.post("/signup", function (req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    username = _req$body.username,
    password = _req$body.password;
  console.log("Signup attempt:", email, username);
  res.json({
    success: true,
    message: "User signed up successfully (stub).",
    user: {
      id: 1,
      email: email,
      username: username
    }
  });
});
app.post("/login", function (req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    password = _req$body2.password;
  console.log("Login attempt:", email);
  if (email && password) {
    res.json({
      success: true,
      message: "Login successful (stub).",
      token: "dummy-token-123",
      user: {
        id: 1,
        email: email
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});
app.use(express["static"](path.join(__dirname, "../frontend-dist")));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend-dist", "index.html"));
});
app.listen(PORT, function () {
  console.log("Backend running on http://localhost:".concat(PORT));
});