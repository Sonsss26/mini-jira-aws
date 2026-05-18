const express = require("express");
const cors = require("cors");
const projectsRoutes = require("./routes/projects.routes");
const tasksRoutes = require("./routes/tasks.routes");
const commentsRoutes = require("./routes/comments.routes");
const usersRoutes = require("./routes/users.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Mini-Jira AWS backend is running",
  });
});

const authenticate = require("./middleware/auth");

app.use("/api/tasks", authenticate, tasksRoutes);
app.use("/api/projects", authenticate, projectsRoutes);
app.use("/api/comments", authenticate, commentsRoutes);
app.use("/api/users", authenticate, usersRoutes);

module.exports = app;