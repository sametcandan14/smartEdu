const express = require("express");

const { createCourse } = require("../controllers/courseController");

const router = express.Router();

//Routes
router.route("/").post(createCourse);

module.exports = router;
