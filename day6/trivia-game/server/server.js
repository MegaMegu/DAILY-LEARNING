import express from "express";
import https from "https";
import cors from "cors";

const app = express();
const PORT = 5000;

// ✅ Enable CORS for all origins
app.use(cors());

// Route to fetch trivia question
app.get("/api/questions", (req, res) => {
  https
    .get("https://opentdb.com/api.php?amount=1&type=multiple", (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        try {
          const json = JSON.parse(data);
          res.json(json.results || []); // send only results array
        } catch (err) {
          res.json([]); // fallback
        }
      });
    })
    .on("error", () => {
      res.json([]); // fallback on request error
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
