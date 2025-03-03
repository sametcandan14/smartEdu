const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

//Routes
router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your Name"),

    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email already exist!");
          }
        });
      }),

    body("password").not().isEmpty().withMessage("Please Enter A Password"),
  ],
  createUser
);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/dashboard").get(authMiddleware, getDashboardPage);

module.exports = router;
