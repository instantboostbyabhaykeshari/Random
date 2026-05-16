const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

// Profile
router.get(
  "/me",
  protect,
  getProfile
);

module.exports = router;