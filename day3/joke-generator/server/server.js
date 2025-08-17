// server.js
import http from "http";

// List of jokes
const jokes = [
  "Why don’t skeletons fight each other? Because they don’t have the guts.",
  "I told my wife she should embrace her mistakes… She gave me a hug.",
  "Why did the math book look sad? Because it had too many problems.",
  "I used to play piano by ear, now I use my hands.",
  "Parallel lines have so much in common… it’s a shame they’ll never meet.",
];

const server = http.createServer((req, res) => {
  // Handle CORS (so React can fetch from backend)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/joke" && req.method === "GET") {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ joke: randomJoke }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
