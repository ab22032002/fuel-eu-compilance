// const express = require("express");
// const dotenv = require("dotenv");
// const routesController = require("../../adapters/inbound/http/routesController");
// const complianceController = require("../../adapters/inbound/http/complianceController");

// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use("/", routesController);
// app.use("/", complianceController);

// module.exports = app;

import express from "express";
import cors from "cors";
import routesController from "../../adapters/inbound/http/routesController";
import complianceController from "../../adapters/inbound/http/complianceController";

const app = express();

app.use(cors());
app.use(express.json()); // <---- THIS IS CRUCIAL
app.use(express.urlencoded({ extended: true }));

app.use("/", routesController);
app.use("/", complianceController);

export default app;
