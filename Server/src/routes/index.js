const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/users", userRoutes);

// task routes
router.use("/tasks", taskRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Working",
  });
});

module.exports = router;