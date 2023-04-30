import express from "express";
const router = express.Router();
import CourseRepository from "../repositories/course";
import { rimraf } from "rimraf";

router.get("/index-course/:province_id", async (req, res) => {
  res.send(await new CourseRepository().index(req.params["province_id"]));
});

router.post("/create-course", async (req, res) => {
  res.send(await new CourseRepository().create(req.body));
});

router.get(`/show-course/:id`, async (req, res) => {
  res.send(await new CourseRepository().show(req.params["id"]));
});

router.put("/update-course/:id", async (req, res) => {
  res.send(await new CourseRepository().update(req.params["id"], req.body));
});

router.delete("/delete-course/:id", async (req, res) => {
  res.send(await new CourseRepository().delete(req.params["id"]));
});

export default router;
