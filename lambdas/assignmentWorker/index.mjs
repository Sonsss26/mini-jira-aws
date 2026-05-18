export const handler = async (event) => {
  console.log("SQS event received:", JSON.stringify(event, null, 2));

  for (const record of event.Records || []) {
    console.log("Message ID:", record.messageId);
    console.log("Raw SQS body:", record.body);

    try {
      const snsMessage = JSON.parse(record.body);

      console.log("SNS Topic ARN:", snsMessage.TopicArn);
      console.log("SNS Subject:", snsMessage.Subject);
      console.log("SNS Message:", snsMessage.Message);

      try {
        const taskData = JSON.parse(snsMessage.Message);
        console.log("Task data:", taskData);
      } catch {
        console.log("SNS Message is plain text, not JSON.");
      }
    } catch (error) {
      console.error("Failed to parse SQS/SNS message:", error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS messages processed successfully",
      records: event.Records?.length || 0,
    }),
  };
};