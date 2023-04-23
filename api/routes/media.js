const MediaRepository = require("../repositories/media");
const router = require("express").Router();

router.get("/index-media", async (req, res) => {
  res.send(await new MediaRepository().index(req.body));
});

router.post("/create-media", async (req, res) => {
  res.send(
    await new MediaRepository().create(req.body)
  );
});

router.delete("/delete-media", async (req, res) => {
  res.send(await new MediaRepository().delete(req.body));
});

module.exports = router;