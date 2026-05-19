const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const region = process.env.AWS_REGION || "eu-north-1";
const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
const sns = new SNSClient({ region });

exports.handler = async () => {
  const today = new Date().toISOString().split("T")[0];
  const topicArn = process.env.SNS_TASK_ASSIGNMENT_TOPIC_ARN;

  if (!topicArn) {
    return { statusCode: 500, body: "SNS_TASK_ASSIGNMENT_TOPIC_ARN not set" };
  }

  const result = await dynamoDB.send(
    new ScanCommand({
      TableName: process.env.TASKS_TABLE,
      FilterExpression: "deadline = :today AND #status <> :done",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":today": today, ":done": "Done" },
    })
  );

  const dueTasks = result.Items || [];
  if (dueTasks.length === 0) {
    return { statusCode: 200, body: "No tasks due today" };
  }

  const byAssignee = {};
  for (const task of dueTasks) {
    const key = task.assigneeName || task.assigneeId || "Unknown";
    if (!byAssignee[key]) byAssignee[key] = [];
    byAssignee[key].push(task);
  }

  for (const [assigneeName, tasks] of Object.entries(byAssignee)) {
    const taskList = tasks.map((t) => `• [${t.status}] ${t.title}`).join("\n");
    await sns.send(
      new PublishCommand({
        TopicArn: topicArn,
        Subject: `Daily Digest — ${tasks.length} task(s) due today`,
        Message: `Hi ${assigneeName},\n\nYou have ${tasks.length} task(s) due today (${today}):\n\n${taskList}\n\n— Mini Jira`,
      })
    );
  }

  return {
    statusCode: 200,
    body: `Digest sent for ${Object.keys(byAssignee).length} assignee(s)`,
  };
};
