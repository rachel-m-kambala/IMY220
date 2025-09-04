"use strict";

//Mukaji Mweni Rachel Kambala u23559129 24
var express = require('express');
var cors = require('cors');
var app = express();
var port = 3000;
app.use(cors());
app.use(express.json());
app.use(express["static"]('frontend/public'));
app.post('/api/auth/login', function (req, res) {
  // Stub: always succeed
  res.json({
    success: true,
    user: {
      id: 1,
      email: req.body.email
    }
  });
});
app.post('/api/auth/signup', function (req, res) {
  // Stub: always succeed
  res.json({
    success: true,
    user: {
      id: 2,
      email: req.body.email
    }
  });
});
app.listen(port, function () {
  console.log("Server is running at http://localhost:".concat(port));
});