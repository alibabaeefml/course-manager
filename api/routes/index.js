const express = require("express");

const router = express.Router();

router.get("/index", (req, res) => {
    res.send("Index Router Test");
});

module.exports = router;
