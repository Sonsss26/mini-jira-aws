const { v4: uuidv4 } = require("uuid");
const { QueryCommand, ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDB } = require("../config/aws");

const TABLE_NAME = process.env.USERS_TABLE;

// Default payload for POST /api/users/seed (dev/setup only — not used by the UI)
const SEED_USERS = [
  { email: "sara@test.com", name: "Sara Frontend", role: "employee", teamId: "frontend" },
  { email: "omar@test.com", name: "Omar Backend", role: "employee", teamId: "backend" },
];

const getEmployeesByTeam = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Manager access required" });
    }

    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ message: "teamId is required" });
    }

    let result;

    try {
      result = await dynamoDB.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: "teamId-index",
          KeyConditionExpression: "teamId = :teamId",
          FilterExpression: "#role = :role",
          ExpressionAttributeNames: { "#role": "role" },
          ExpressionAttributeValues: {
            ":teamId": teamId,
            ":role": "employee",
          },
        })
      );
    } catch (queryError) {
      console.warn("teamId-index query failed, falling back to scan:", queryError.message);
      result = await dynamoDB.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          FilterExpression: "teamId = :teamId AND #role = :role",
          ExpressionAttributeNames: { "#role": "role" },
          ExpressionAttributeValues: {
            ":teamId": teamId,
            ":role": "employee",
          },
        })
      );
    }

    const employees = (result.Items || []).map(({ id, email, name, teamId: tid }) => ({
      id,
      email,
      name,
      teamId: tid,
    }));

    res.json(employees);
  } catch (error) {
    console.error("Get employees by team error:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

const seedUsers = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Manager access required" });
    }

    const usersToSeed = Array.isArray(req.body?.users) && req.body.users.length > 0
      ? req.body.users
      : SEED_USERS;

    const now = new Date().toISOString();
    const items = usersToSeed.map((user) => ({
      id: user.id || uuidv4(),
      email: user.email,
      name: user.name,
      role: user.role || "employee",
      teamId: user.teamId,
      createdAt: user.createdAt || now,
    }));

    for (const item of items) {
      if (!item.email || !item.name || !item.teamId) {
        return res.status(400).json({
          message: "Each user requires email, name, and teamId",
        });
      }
    }

    await Promise.all(
      items.map((item) =>
        dynamoDB.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
          })
        )
      )
    );

    res.status(201).json({
      message: `${items.length} user(s) seeded successfully`,
      users: items.map(({ id, email, name, role, teamId, createdAt }) => ({
        id,
        email,
        name,
        role,
        teamId,
        createdAt,
      })),
    });
  } catch (error) {
    console.error("Seed users error:", error);
    res.status(500).json({ message: "Failed to seed users" });
  }
};

module.exports = { getEmployeesByTeam, seedUsers };
