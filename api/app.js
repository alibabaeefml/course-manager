const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");

// routers
const courses_router = require("./routes/course.js");
function send_data(data) {
  res.send(data);
}

const app = express();
app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(courses_router);

app.listen("3001", console.log("Listening"));