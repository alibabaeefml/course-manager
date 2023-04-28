import express from "express";
import body_parser from "body-parser";

// routers

import course_router from "./routes/course.js";
import province_router from "./routes/province.js";
import media_router from "./routes/media.js";

const app = express();

app.use(body_parser.json());
app.use(express.urlencoded({ extended: true }));
app.use(course_router, province_router, media_router);

// app.listen("3001", console.log("Listening"));

export const handler = app;
