const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");

// routers
const course_router = require("./routes/course.js");
const province_router = require("./routes/province.js");
const media_router = require("./routes/media.js");

const app = express();
app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(course_router, province_router, media_router);

app.listen("3001", console.log("Listening"));