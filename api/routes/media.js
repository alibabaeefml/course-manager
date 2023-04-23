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

router.delete("/delete-media/:id", async (req, res) => {
  res.send(await new MediaRepository().delete(req.params["id"]));
});

module.exports = router;