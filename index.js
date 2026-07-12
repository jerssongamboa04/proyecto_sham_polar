require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "sham-app-api",
    database: "supabase",
  });
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      ok: true,
      database: "connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("DB CHECK ERROR:", error);

    res.status(500).json({
      ok: false,
      database: "error",
      message: error.message,
    });
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});