const { v4: uuidv4 } = require("uuid");
const { PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDB } = require("../config/aws");
const { getTaskById, canAccessTask } = require("../utils/taskAccess");
const { isNonEmptyString } = require("../utils/validation");

const TABLE_NAME = process.env.COMMENTS_TABLE;

const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!canAccessTask(req.user, task)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await dynamoDB.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "taskId-index",
        KeyConditionExpression: "taskId = :taskId",
        ExpressionAttributeValues: { ":taskId": taskId },
      })
    );

    res.json(result.Items || []);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

    if (!isNonEmptyString(text)) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!canAccessTask(req.user, task)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const newComment = {
      id: uuidv4(),
      taskId,
      text: text.trim(),
      authorId: req.user.sub,
      authorName: req.user.email || req.user.sub,
      authorRole: req.user.role,
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: newComment }));

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ message: "Failed to create comment" });
  }
};

module.exports = { getCommentsByTask, createComment };
