const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const setupMiddlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(helmet());
};

module.exports = setupMiddlewares;
