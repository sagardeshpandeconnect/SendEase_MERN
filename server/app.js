const express = require("express");
const helmet = require("helmet");
const fileRoute = require("./routes/file.route");
const corsConfig = require("./configs/cors.config");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(corsConfig);
app.use(helmet());

// Routes
app.use("/", fileRoute);

module.exports = app;
