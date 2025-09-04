//Mukaji Mweni Rachel Kambala u23559129 24
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend/public'));

app.post('/api/auth/login', (req, res) => {

  res.json({ success: true, user: { id: 1, email: req.body.email } });
});

app.post('/api/auth/signup', (req, res) => {
  res.json({ success: true, user: { id: 2, email: req.body.email } });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});