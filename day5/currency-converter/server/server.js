// server.js
import http from "http";
import https from "https";
import url from "url";

const PORT = 5000;
const API_KEY = "10ed0a840c1c509e139d0e1b865e8743"; // Your key

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { amount, from, to } = parsedUrl.query;

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (parsedUrl.pathname === "/convert" && req.method === "GET") {
    if (!amount || !from || !to) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing parameters" }));
      return;
    }

    // Call exchangerate.host API with key
    const apiUrl = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=${API_KEY}`;

    https
      .get(apiUrl, (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => (data += chunk));
        apiRes.on("end", () => {
          try {
            const parsed = JSON.parse(data);

            if (!parsed.success) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  error: parsed.error.info || "Conversion failed",
                })
              );
              return;
            }

            const result = parsed.result;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ converted: result }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to parse API response" }));
          }
        });
      })
      .on("error", () => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to fetch conversion" }));
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
