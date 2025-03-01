const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;

    let filter = {};

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });

      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort("-createdAt");
    const categories = await Category.find();

    res
      .status(200)
      .render("courses", { pageName: "courses", courses, categories });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );

    res.status(200).render("course", { pageName: "courses", course });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
