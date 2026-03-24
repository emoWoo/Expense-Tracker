const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const route = require("./routes/index");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

connectDB();

app.use("/", route);

app.use("/upload", express.static(path.join(__dirname, "uploads")));

const POST = process.env.PORT || 5000;

app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});
