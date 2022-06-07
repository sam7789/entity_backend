const express = require("express");
const cors = require("cors");
const courseController = require("./controller/courseControtroller");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/courses", courseController);

module.exports = app;
