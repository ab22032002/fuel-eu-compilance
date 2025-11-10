const express = require("express");
const dotenv = require("dotenv");
const routesController = require("../../adapters/inbound/http/routesController");
const complianceController = require("../../adapters/inbound/http/complianceController");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/", routesController);
app.use("/", complianceController);

module.exports = app;

