const express = require("express");
const multer = require("multer");

const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getTasks);
router.post("/", upload.single("image"), createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;