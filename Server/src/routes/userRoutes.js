const express = require("express");

const router = express.Router();

const {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// only admin can access these routes
router.use(protect);
router.use(authorizeRoles("admin"));

// routes
router.get("/", getUsers);

router.get("/:id", getSingleUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;