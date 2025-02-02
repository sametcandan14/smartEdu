const express = require("express");

const {
  createCourse,
  getAllCourses,
} = require("../controllers/courseController");

const router = express.Router();

//Routes
router.route("/").post(createCourse);

router.route("/").get(getAllCourses);

module.exports = router;
