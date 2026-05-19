const { v4: uuidv4 } = require("uuid");
const { PutCommand, ScanCommand, UpdateCommand, DeleteCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDB } = require("../config/aws");
const { isNonEmptyString } = require("../utils/validation");

const TABLE_NAME = process.env.PROJECTS_TABLE;

const getProjects = async (req, res) => {
  try {
    const result = await dynamoDB.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(result.Items || []);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!isNonEmptyString(name) || !isNonEmptyString(description)) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const newProject = {
      id: uuidv4(),
      name: name.trim(),
      description: description.trim(),
      createdBy: req.user.email || req.user.sub,
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.send(new PutCommand({ TableName: TABLE_NAME, Item: newProject }));
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!isNonEmptyString(name) || !isNonEmptyString(description)) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const result = await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "SET #name = :name, description = :description, updatedAt = :updatedAt",
        ExpressionAttributeNames: { "#name": "name" },
        ExpressionAttributeValues: {
          ":name": name.trim(),
          ":description": description.trim(),
          ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      })
    );

    res.json(result.Attributes);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await dynamoDB.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );
    if (!existing.Item) {
      return res.status(404).json({ message: "Project not found" });
    }

    await dynamoDB.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
