const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  downloadAttachment,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// all task routes protected
router.use(protect);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 */

// routes
router.post("/", upload.array("documents", 3), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */

router.get("/", getTasks);

router.get("/:id", getSingleTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

// download task attachment
router.get("/download/:fileName", downloadAttachment);

module.exports = router;
