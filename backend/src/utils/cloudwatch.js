const { CloudWatchClient, PutMetricDataCommand } = require("@aws-sdk/client-cloudwatch");

const cloudwatch = new CloudWatchClient({ region: process.env.AWS_REGION || "eu-north-1" });

const sendMetric = async (metricName, value, unit = "Count") => {
  try {
    await cloudwatch.send(
      new PutMetricDataCommand({
        Namespace: "MiniJira",
        MetricData: [
          {
            MetricName: metricName,
            Value: value,
            Unit: unit,
            Timestamp: new Date(),
          },
        ],
      })
    );
  } catch (error) {
    console.error("[CloudWatch] Failed to send metric:", error.message);
  }
};

const sendTaskMetricByTeam = async (metricName, teamId, value = 1) => {
  try {
    await cloudwatch.send(
      new PutMetricDataCommand({
        Namespace: "MiniJira",
        MetricData: [
          {
            MetricName: metricName,
            Value: value,
            Unit: "Count",
            Timestamp: new Date(),
            Dimensions: [{ Name: "Team", Value: teamId || "unknown" }],
          },
        ],
      })
    );
  } catch (error) {
    console.error("[CloudWatch] Failed to send metric:", error.message);
  }
};

module.exports = { sendMetric, sendTaskMetricByTeam };
