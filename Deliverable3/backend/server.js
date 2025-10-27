//Mukaji Mweni Rachel Kambala u23559129 position-24

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  console.log("Signup attempt:", email, username);

  res.json({
    success: true,
    message: "User signed up successfully (stub).",
    user: {
      id: 1,
      email,
      username,
    },
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (email && password) {
    res.json({
      success: true,
      message: "Login successful (stub).",
      token: "dummy-token-123",
      user: {
        id: 1,
        email,
      },
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend-dist")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend-dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});