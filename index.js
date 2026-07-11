require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./Routes/ROUTES.JS");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});