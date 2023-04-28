import ProvinceRepository from "../repositories/province";

import express from "express";
const router = express.Router();

router.get("/index-provinces", async (req, res) => {
  res.send(await new ProvinceRepository().index());
});


export default router;
