const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/users", userRoutes);

// task routes
router.use("/tasks", taskRoutes);

// dashboard routes
router.use("/dashboard", dashboardRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Working",
  });
});

module.exports = router;