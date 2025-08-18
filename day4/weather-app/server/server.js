// server.js
import http from "http";
import https from "https";
import url from "url";

const API_KEY = "560f43071757677b701171f15b9cdcf6"; // 🔑 put your real key here
const PORT = 5000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Enable CORS so frontend can fetch
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (parsedUrl.pathname === "/weather" && req.method === "GET") {
    const city = parsedUrl.query.city;

    if (!city) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "City is required" }));
      return;
    }

    // Call OpenWeather API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    https
      .get(apiUrl, (apiRes) => {
        let data = "";

        apiRes.on("data", (chunk) => {
          data += chunk;
        });

        apiRes.on("end", () => {
          try {
            const weatherData = JSON.parse(data);

            if (weatherData.cod !== 200) {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "City not found" }));
              return;
            }

            // Send clean response to frontend
            const response = {
              city: weatherData.name,
              temp: weatherData.main.temp,
              description: weatherData.weather[0].description,
            };

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to parse weather data" }));
          }
        });
      })
      .on("error", () => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to fetch weather" }));
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
