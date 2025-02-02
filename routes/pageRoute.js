const express = require("express");

const { getIndexPage, getAboutPage } = require("../controllers/pageController");

const router = express.Router();

//Routes
router.route("/").get(getIndexPage);

router.route("/about").get(getAboutPage);

module.exports = router;
