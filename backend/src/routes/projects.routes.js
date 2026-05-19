const express = require("express");
const requireManager = require("../middleware/requireManager");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

const router = express.Router();

router.get("/", getProjects);
router.post("/", requireManager, createProject);
router.put("/:id", requireManager, updateProject);
router.delete("/:id", requireManager, deleteProject);

module.exports = router;
