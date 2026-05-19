const { v4: uuidv4 } = require("uuid");
const { PublishCommand } = require("@aws-sdk/client-sns");
const {
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");

const { dynamoDB, snsClient } = require("../config/aws");
const { uploadFileToS3, getImageUrl, deleteTaskImages } = require("../services/s3.service");
const { sendMetric, sendTaskMetricByTeam } = require("../utils/cloudwatch");
const {
  isNonEmptyString,
  isValidStatus,
  isValidPriority,
  isValidTeamId,
} = require("../utils/validation");

const TABLE_NAME = process.env.TASKS_TABLE;

const attachImageUrls = async (task) => ({
  ...task,
  imageUrl: await getImageUrl(task.imageKey, false),
  resizedImageUrl: await getImageUrl(task.resizedImageKey, true),
});

const publishTaskAssigned = async (task, assignedBy) => {
  const topicArn = process.env.SNS_TASK_ASSIGNMENT_TOPIC_ARN;
  if (!topicArn) return;

  try {
    await snsClient.send(
      new PublishCommand({
        TopicArn: topicArn,
        Subject: `New task assigned: ${task.title}`,
        Message: JSON.stringify({
          taskId: task.id,
          title: task.title,
          assigneeId: task.assigneeId,
          assigneeName: task.assigneeName,
          teamId: task.teamId,
          deadline: task.deadline,
          assignedBy: assignedBy || "manager",
        }),
      })
    );
  } catch (error) {
    console.error("SNS publish error (non-fatal):", error.message);
  }
};

const getTasks = async (req, res) => {
  try {
    const { role, teamId: userTeamId } = req.user;
    const filterTeam = req.query.teamId;

    let result;

    if (role === "manager") {
      if (filterTeam) {
        if (!isValidTeamId(filterTeam)) {
          return res.status(400).json({ message: "Invalid team filter" });
        }
        result = await dynamoDB.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            IndexName: "teamId-index",
            KeyConditionExpression: "teamId = :teamId",
            ExpressionAttributeValues: { ":teamId": filterTeam },
          })
        );
      } else {
        result = await dynamoDB.send(new ScanCommand({ TableName: TABLE_NAME }));
      }
    } else {
      if (!userTeamId) {
        return res.status(403).json({
          message: "Missing teamId on your account. Set custom:teamId in Cognito.",
        });
      }
      result = await dynamoDB.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: "teamId-index",
          KeyConditionExpression: "teamId = :teamId",
          ExpressionAttributeValues: { ":teamId": userTeamId },
        })
      );
    }

    const tasksWithImages = await Promise.all(
      (result.Items || []).map(attachImageUrls)
    );

    res.json(tasksWithImages);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, teamId, assigneeId, assigneeName } =
      req.body;

    if (!isNonEmptyString(title)) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!isNonEmptyString(description)) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!isValidPriority(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
    if (!isValidTeamId(teamId)) {
      return res.status(400).json({ message: "Invalid teamId" });
    }
    if (!isNonEmptyString(assigneeId) || !isNonEmptyString(assigneeName)) {
      return res.status(400).json({ message: "Assignee is required" });
    }

    let imageKey = null;
    if (req.file) {
      imageKey = await uploadFileToS3(req.file);
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      priority,
      deadline: deadline || null,
      teamId,
      assigneeId,
      assigneeName,
      imageKey,
      resizedImageKey: null,
      status: "To Do",
      createdAt: new Date().toISOString(),
      createdBy: req.user.sub,
    };

    await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: newTask }));

    await publishTaskAssigned(newTask, req.user.email);
    await sendMetric("TasksCreated", 1);
    await sendTaskMetricByTeam("TasksCreatedByTeam", teamId, 1);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidStatus(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const currentTask = await dynamoDB.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );

    if (!currentTask.Item) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "manager" && currentTask.Item.teamId !== req.user.teamId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const oldStatus = currentTask.Item.status;
    const { createdAt, teamId } = currentTask.Item;

    const result = await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "SET #status = :status, updatedAt = :updatedAt, updatedBy = :updatedBy",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": new Date().toISOString(),
          ":updatedBy": req.user.email || req.user.sub,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    if (status === "Done" && oldStatus !== "Done") {
      await sendMetric("TasksClosed", 1);
      if (teamId) await sendTaskMetricByTeam("TasksClosedByTeam", teamId, 1);
      if (createdAt) {
        const hoursToClose =
          (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
        await sendMetric("TimeToClose", hoursToClose, "None");
      }
    }

    res.json(result.Attributes);
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({ message: "Failed to update task status" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await dynamoDB.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );

    if (!existing.Item) {
      return res.status(404).json({ message: "Task not found" });
    }

    await deleteTaskImages(existing.Item);

    await dynamoDB.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
