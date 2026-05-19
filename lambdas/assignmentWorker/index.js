const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { CloudWatchClient, PutMetricDataCommand } = require("@aws-sdk/client-cloudwatch");
const { v4: uuidv4 } = require("uuid");

const region = process.env.AWS_REGION || "eu-north-1";
const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
const cloudWatch = new CloudWatchClient({ region });

exports.handler = async (event) => {
  for (const record of event.Records || []) {
    let notification;
    try {
      const snsEnvelope = JSON.parse(record.body);
      notification = JSON.parse(snsEnvelope.Message);
    } catch (error) {
      console.error("Failed to parse SQS/SNS message:", error);
      continue;
    }

    console.log("Processing assignment:", notification);

    await dynamoDB.send(
      new PutCommand({
        TableName: process.env.ACTIVITY_LOG_TABLE || "ActivityLog",
        Item: {
          id: uuidv4(),
          type: "TASK_ASSIGNED",
          taskId: notification.taskId,
          taskTitle: notification.title,
          assigneeId: notification.assigneeId,
          assigneeName: notification.assigneeName,
          teamId: notification.teamId,
          assignedBy: notification.assignedBy,
          timestamp: new Date().toISOString(),
        },
      })
    );

    await cloudWatch.send(
      new PutMetricDataCommand({
        Namespace: "MiniJira",
        MetricData: [
          {
            MetricName: "TasksAssigned",
            Dimensions: [{ Name: "TeamId", Value: notification.teamId || "unknown" }],
            Value: 1,
            Unit: "Count",
            Timestamp: new Date(),
          },
        ],
      })
    );
  }

  return { statusCode: 200, body: "Processed" };
};
