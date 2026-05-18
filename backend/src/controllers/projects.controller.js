const { v4: uuidv4 } = require("uuid");
const {
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { dynamoDB } = require("../config/aws");

const TABLE_NAME = process.env.PROJECTS_TABLE;

const getProjects = async (req, res) => {
  const result = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );

  res.json(result.Items || []);
};

const createProject = async (req, res) => {
  const { name, description } = req.body;

  const newProject = {
    id: uuidv4(),
    name,
    description,
    createdAt: new Date().toISOString(),
  };

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: newProject,
    })
  );

  res.status(201).json(newProject);
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const result = await dynamoDB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression:
        "SET #name = :name, description = :description, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":description": description,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  res.json(result.Attributes);
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  await dynamoDB.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );

  res.json({ message: "Project deleted successfully" });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};