const ProvinceRepository = require("../repositories/province");

const router = require("express").Router();

router.get("/index-provinces", async (req, res) => {
  res.send(await new ProvinceRepository().index());
});

module.exports = router