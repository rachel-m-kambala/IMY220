//Mukaji Mweni Rachel Kambala u23559129 24
import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('frontend/public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});