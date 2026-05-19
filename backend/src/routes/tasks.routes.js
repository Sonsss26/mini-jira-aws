const express = require("express");
const multer = require("multer");
const requireManager = require("../middleware/requireManager");
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getTasks);
router.post("/", requireManager, upload.single("image"), createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", requireManager, deleteTask);

module.exports = router;
