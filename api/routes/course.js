const router = require("express").Router();
const CourseRepository = require("../repositories/course");

router.get("/index", async (req, res) => {
  res.send(await new CourseRepository().index());
});

router.post("/create", async (req, res) => {
  res.send(
    await new CourseRepository().create({
      id: 0,
      province_id: 0,
      name: "نام دوره",
      number: "31313",
      members_quantity: 10,
      start_date: "1402/02/03",
      finish_date: "1402/02/25",
      total_hours_participated_in: 300,
    })
  );
});

router.get("/show", async (req, res) => {
  res.send(await new CourseRepository().show(62));
});

module.exports = router;
