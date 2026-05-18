const express = require("express");

const {
  getCommentsByTask,
  createComment,
} = require("../controllers/comments.controller");

const router = express.Router();

router.get("/:taskId", getCommentsByTask);
router.post("/:taskId", createComment);

module.exports = router;