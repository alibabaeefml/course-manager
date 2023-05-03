import express from "express";
const router = express.Router();
import teacherRepository from "../repositories/teacher";

router.get("/index-teacher", async (req, res) => {
  res.send(await new teacherRepository().index());
});

router.post("/create-teacher", async (req, res) => {
  res.send(await new teacherRepository().create(req.body));
});

router.get(`/show-teacher/:id`, async (req, res) => {
  res.send(await new teacherRepository().show(req.params["id"]));
});

router.put("/update-teacher/:id", async (req, res) => {
  res.send(await new teacherRepository().update(req.params["id"], req.body));
});

router.delete("/delete-teacher/:id", async (req, res) => {
  res.send(await new teacherRepository().delete(req.params["id"]));
});

export default router;
