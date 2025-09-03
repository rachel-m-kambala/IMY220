//Mukaji Mweni Rachel Kambala u23559129 24
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Stub routes
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: "Signup successful (stub)",
    user: {
      id: "12345",
      email,
      token: "fake-jwt-token",
    },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: "Login successful (stub)",
    user: {
      id: "12345",
      email,
      token: "fake-jwt-token",
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
