const router = require("express").Router();
const CourseRepository = require("../repositories/course");

router.get("/index-course", async (req, res) => {
  res.send(await new CourseRepository().index());
});

router.post("/create-course", async (req, res) => {
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

router.get(`/show-course`, async (req, res) => {
  res.send(await new CourseRepository().show(62));
});

router.put("/update-course", async (req, res) => {
  res.send(await new CourseRepository().update(62, { name: "دوره جدید" }));
});

router.delete("/delete-course", async (req, res)=>{
  res.send(await new CourseRepository().delete(62))
})

module.exports = router;
