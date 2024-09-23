const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cache = require("memory-cache");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(cors());
app.use(helmet());

const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_GLOBAL, 10),
});
app.use(globalLimiter);

const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_API, 10),
});

app.use("/api", apiLimiter);

const requestCountsFilePath = path.join(__dirname, process.env.REQUEST_COUNTS_FILE);
let requestCounts = {};
if (fs.existsSync(requestCountsFilePath)) {
  const data = fs.readFileSync(requestCountsFilePath, "utf-8");
  requestCounts = JSON.parse(data);
}

const authorizedIPs = process.env.AUTIP.split(',');

function checkIPAuthorization(req, res, next) {
  const ip = req.ip;
  if (!authorizedIPs.includes(ip)) {
    return res.status(403).send("IP não autorizado a fazer esta ação.");
  }
  next();
}

// Contagem de requisições por IP
app.use("/api", (req, res, next) => {
  const ip = req.ip;
  if (!requestCounts[ip]) {
    requestCounts[ip] = 0;
  }
  requestCounts[ip]++;
  next();
});

// Salvar contagem de requisições em um arquivo
function saveRequestCounts() {
  const data = JSON.stringify(requestCounts, null, 2);
  fs.writeFile(requestCountsFilePath, data, (err) => {
    if (err) {
      console.error("Erro ao salvar contagem de requisições:", err);
    } 
  });
}

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

app.get("/api", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (start_date && !isValidDate(start_date)) {
      return res.status(400).send("Data de início inválida. Use o formato AAAA-MM-DD.");
    }
    if (end_date && !isValidDate(end_date)) {
      return res.status(400).send("Data de fim inválida. Use o formato AAAA-MM-DD.");
    }

    const cacheKey = `api:${start_date || ""}:${end_date || ""}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const client = await pool.connect();
    let query = "SELECT * FROM itens";
    let queryParams = [];
    if (start_date && end_date) {
      query += " WHERE datalote BETWEEN $1 AND $2";
      queryParams.push(start_date, end_date);
    }

    const result = await client.query(query, queryParams);
    client.release();
    res.json(result.rows);

    const now = new Date();
    const formattedDate = formatDate(now);
    const formattedFileNameDate = formatFileNameDate(now);
    const filename = `Relatório-${formattedFileNameDate}.json`;
    const backupDir = path.join(__dirname, process.env.BACKUP_DIR);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const filePath = path.join(backupDir, filename);
    const dataWithTimestamp = {
      timestamp: formattedDate,
      ip: req.ip,
      data: result.rows,
    };
    const backupData = JSON.stringify(dataWithTimestamp, null, 2);
    fs.writeFile(filePath, backupData, (err) => {
      if (err) {
        console.error(err);
      }
    });

    cache.put(cacheKey, result.rows, parseInt(process.env.CACHE_DURATION_MS, 10));
    saveRequestCounts();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao conectar no banco de dados");
  }
});

app.get("/request-counts", (req, res) => {
  res.json(requestCounts);
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
