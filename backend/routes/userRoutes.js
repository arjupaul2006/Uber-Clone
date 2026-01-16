const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth.middleware");

// signup route
router.post(
  "/register",

  // Express Validator (All Errors for these fields)
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  
  userController.registerUser
);

// login route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  userController.loginUser
);

// profile route
router.get("/profile", authMiddleware.authenticateUser, userController.getUserProfile);

// logout route
router.post("/logout", authMiddleware.authenticateUser, userController.logoutUser);

module.exports = router;
