const express = require("express");

const { createCategory } = require("../controllers/categoryController");

const router = express.Router();

//Routes
router.route("/").post(createCategory);

module.exports = router;
