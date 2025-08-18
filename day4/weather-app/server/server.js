import http from "http";
import https from "https";
import url from "url";

const API_KEY = "560f43071757677b701171f15b9cdcf6";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const queryObject = url.parse(req.url, true).query;

  if (req.url.startsWith("/weather")) {
    const city = queryObject.city;

    if (!city) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "City is required" }));
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    https.get(apiUrl, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => (data += chunk));
      apiRes.on("end", () => {
        try {
          const parsed = JSON.parse(data);

          if (parsed.cod !== 200) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: parsed.message }));
            return;
          }

          const response = {
            city: parsed.name,
            temp: parsed.main.temp,
            description: parsed.weather[0].description,
          };

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(response));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to parse API response" }));
        }
      });
    });
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
