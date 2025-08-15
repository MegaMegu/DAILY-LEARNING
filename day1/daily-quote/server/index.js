const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const quotes = [
  "Magbabago lang ang pasan, ang lahat mapapalitan pero mananatili kang walang hanggan",
  "Already made a million mistakes, whats another?",
  "You're right where you supposed to be you gotta to know this, just look around so u could notice",
  "Malalampasan din ang lahat ng paghihirap",
];

app.get("/quote", (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
