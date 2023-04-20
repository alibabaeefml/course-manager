const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
// routes
const index_router = require("./routes");

const app = express();
app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(index_router);

app.listen("3001", console.log("Listening"));
