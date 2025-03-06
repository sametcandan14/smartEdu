const express = require("express");

const {
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

//Routes
router.route("/").post(createCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
