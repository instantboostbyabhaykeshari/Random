const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  protect,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// all task routes protected
router.use(protect);

// routes
router.post(
  "/",
  upload.array("documents", 3),
  createTask
);

router.get("/", getTasks);

router.get("/:id", getSingleTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;