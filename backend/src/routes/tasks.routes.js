const express = require("express");

const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;