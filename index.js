require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
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
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});