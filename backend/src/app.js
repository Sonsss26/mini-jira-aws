const express = require("express");
const cors = require("cors");
const projectsRoutes = require("./routes/projects.routes");
const tasksRoutes = require("./routes/tasks.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Mini-Jira AWS backend is running",
  });
});

app.use("/api/tasks", tasksRoutes);
app.use("/api/projects", projectsRoutes);

module.exports = app;