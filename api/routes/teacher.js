import express from "express";
const router = express.Router();
import attendantRepository from "../repositories/attendant";

router.get("/index-attendant/:course_id?", async (req, res) => {
  res.send(await new attendantRepository().index(req.params["course_id"]));
});

router.post("/create-attendant", async (req, res) => {
  res.send(await new attendantRepository().create(req.body));
});

router.get(`/show-attendant/:id`, async (req, res) => {
  res.send(await new attendantRepository().show(req.params["id"]));
});

router.put("/update-attendant/:id", async (req, res) => {
  res.send(await new attendantRepository().update(req.params["id"], req.body));
});

router.delete("/delete-attendant/:id", async (req, res) => {
  res.send(await new attendantRepository().delete(req.params["id"]));
});

export default router;
