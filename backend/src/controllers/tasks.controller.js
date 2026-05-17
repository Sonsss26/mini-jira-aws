const { v4: uuidv4 } = require("uuid");
const {
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { dynamoDB } = require("../config/aws");
const { uploadFileToS3, getImageUrl } = require("../services/s3.service");

const TABLE_NAME = process.env.TASKS_TABLE;

const getTasks = async (req, res) => {
  try {
    const role = req.user.role;
    const teamId = req.user.teamId;

    let result;

    if (role === "manager") {
      result = await dynamoDB.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        }),
      );
    } else {
      result = await dynamoDB.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: "teamId-index",
          KeyConditionExpression: "teamId = :teamId",
          ExpressionAttributeValues: {
            ":teamId": teamId,
          },
        }),
      );
    }

    const tasksWithImages = await Promise.all(
      (result.Items || []).map(async (task) => ({
        ...task,
        imageUrl: await getImageUrl(task.imageKey),
      })),
    );

    res.json(tasksWithImages);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};
const createTask = async (req, res) => {
  try {
    let imageKey = null;

    if (req.file) {
      imageKey = await uploadFileToS3(req.file);
    }

    const {
      title,
      description,
      priority,
      deadline,
      teamId,
      assigneeId,
      assigneeName,
    } = req.body;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority,
      deadline,
      teamId,
      assigneeId,
      assigneeName,
      imageKey,
      status: "To Do",
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newTask,
      }),
    );

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

    const result = await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "SET #status = :status, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      }),
    );

    res.json(result.Attributes);
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({ message: "Failed to update task status" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await dynamoDB.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }),
    );

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
