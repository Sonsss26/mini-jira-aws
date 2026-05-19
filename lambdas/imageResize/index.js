const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const sharp = require("sharp");

const region = process.env.AWS_REGION || "eu-north-1";
const s3 = new S3Client({ region });
const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

exports.handler = async (event) => {
  for (const record of event.Records || []) {
    const sourceBucket = record.s3.bucket.name;
    const fileKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
    const resizedBucket = process.env.S3_RESIZED_BUCKET;

    if (!fileKey.startsWith("tasks/")) continue;

    console.log(`Resizing ${fileKey} from ${sourceBucket}`);

    const original = await s3.send(
      new GetObjectCommand({ Bucket: sourceBucket, Key: fileKey })
    );
    const bodyBuffer = await streamToBuffer(original.Body);

    const resized = await sharp(bodyBuffer)
      .resize({ width: 300, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const resizedKey = fileKey.replace(/^tasks\//, "resized/");

    await s3.send(
      new PutObjectCommand({
        Bucket: resizedBucket,
        Key: resizedKey,
        Body: resized,
        ContentType: "image/jpeg",
      })
    );

    try {
      const tasks = await dynamoDB.send(
        new ScanCommand({
          TableName: process.env.TASKS_TABLE,
          FilterExpression: "imageKey = :key",
          ExpressionAttributeValues: { ":key": fileKey },
        })
      );

      if (tasks.Items?.length) {
        const task = tasks.Items[0];
        await dynamoDB.send(
          new UpdateCommand({
            TableName: process.env.TASKS_TABLE,
            Key: { id: task.id },
            UpdateExpression: "SET resizedImageKey = :key",
            ExpressionAttributeValues: { ":key": resizedKey },
          })
        );
        console.log(`Updated task ${task.id} with resizedImageKey`);
      }
    } catch (dbError) {
      console.error("DynamoDB update error (non-fatal):", dbError.message);
    }
  }

  return { statusCode: 200, body: "Resize complete" };
};
