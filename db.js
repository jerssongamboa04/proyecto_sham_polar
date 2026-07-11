const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL no está definida en el archivo .env");
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;