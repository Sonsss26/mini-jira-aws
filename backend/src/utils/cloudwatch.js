const { CloudWatchClient, PutMetricDataCommand } = require("@aws-sdk/client-cloudwatch");

const cloudwatch = new CloudWatchClient({ region: "eu-north-1" });

const sendMetric = async (metricName, value, unit = "Count") => {
  const params = {
    Namespace: "MiniJira",
    MetricData: [
      {
        MetricName: metricName,
        Value: value,
        Unit: unit,
        Timestamp: new Date(),
      },
    ],
  };

  try {
    await cloudwatch.send(new PutMetricDataCommand(params));
    console.log(`[CloudWatch] Metric sent: ${metricName} = ${value} ${unit}`);
  } catch (error) {
    console.error("[CloudWatch] Failed to send metric:", error.message);
  }
};

const sendTaskMetricByTeam = async (metricName, teamId, value = 1) => {
  const params = {
    Namespace: "MiniJira",
    MetricData: [
      {
        MetricName: metricName,
        Value: value,
        Unit: "Count",
        Timestamp: new Date(),
        Dimensions: [
          {
            Name: "Team",
            Value: teamId,
          },
        ],
      },
    ],
  };

  try {
    await cloudwatch.send(new PutMetricDataCommand(params));
    console.log(`[CloudWatch] Metric sent: ${metricName} for team ${teamId} = ${value}`);
  } catch (error) {
    console.error("[CloudWatch] Failed to send metric:", error.message);
  }
};

module.exports = { sendMetric, sendTaskMetricByTeam };