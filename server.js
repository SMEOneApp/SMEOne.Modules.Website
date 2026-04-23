const fs = require("fs");
const http = require("http");
const path = require("path");

const waitlistHandler = require("./api/waitlist");

const PORT = Number(process.env.PORT || 3001);
const ENV_PATH = path.join(__dirname, ".env");

const loadEnvFile = () => {
  if (!fs.existsSync(ENV_PATH)) {
    return;
  }

  const envFile = fs.readFileSync(ENV_PATH, "utf8");

  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
};

loadEnvFile();

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === "/api/waitlist") {
    const body = await readBody(req);
    const event = {
      httpMethod: req.method,
      headers: req.headers,
      body,
      queryStringParameters: {},
    };

    const result = await waitlistHandler.handler(event);

    res.statusCode = result.statusCode;
    Object.entries(result.headers || {}).forEach(([k, v]) =>
      res.setHeader(k, v)
    );
    res.end(result.body);
    return;
  }

  if (req.url === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Not found." }));
});

server.listen(PORT, () => {
  console.log(`Waitlist API listening on http://localhost:${PORT}`);
});
