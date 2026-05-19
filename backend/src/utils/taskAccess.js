const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDB } = require("../config/aws");

const TASKS_TABLE = process.env.TASKS_TABLE;

const getTaskById = async (taskId) => {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: TASKS_TABLE,
      Key: { id: taskId },
    })
  );
  return result.Item || null;
};

const canAccessTask = (user, task) => {
  if (!task) return false;
  if (user.role === "manager") return true;
  return task.teamId === user.teamId;
};

module.exports = { getTaskById, canAccessTask };
