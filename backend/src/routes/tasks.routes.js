const express = require("express");
const multer = require("multer");

const authenticate = require("../middleware/auth");

const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", authenticate, getTasks);

router.post("/", authenticate, upload.single("image"), createTask);

router.patch("/:id/status", authenticate, updateTaskStatus);

router.delete("/:id", authenticate, deleteTask);

module.exports = router;
