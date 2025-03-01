const express = require("express");

const {
  createCourse,
  getAllCourses,
  getCourse,
  enrollCourse,
  releaseCourse,
} = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

//Routes
router.route("/").post(roleMiddleware(["teacher", "admin"]), createCourse);

router.route("/").get(getAllCourses);

router.route("/:slug").get(getCourse);

router.route("/enroll").post(enrollCourse);

router.route("/release").post(releaseCourse);

module.exports = router;
