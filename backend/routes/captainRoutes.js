const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captainController");

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

    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle Color must be at least 2 characters long"),

    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle Plate must be at least 2 characters long"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle Plate must be at least 1 number long"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],

  captainController.registerCaptain,
);

module.exports = router;
