const { v4: uuidv4 } = require("uuid");
const {
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const { dynamoDB } = require("../config/aws");

const TABLE_NAME = process.env.COMMENTS_TABLE;

const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const result = await dynamoDB.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "taskId-index",
        KeyConditionExpression: "taskId = :taskId",
        ExpressionAttributeValues: {
          ":taskId": taskId,
        },
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
    const { text, authorName, authorRole } = req.body;

    const newComment = {
      id: uuidv4(),
      taskId,
      text,
      authorName,
      authorRole,
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newComment,
      })
    );

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ message: "Failed to create comment" });
  }
};

module.exports = {
  getCommentsByTask,
  createComment,
};