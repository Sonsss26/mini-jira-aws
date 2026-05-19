const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../config/aws");

const uploadFileToS3 = async (file) => {
  const fileKey = `tasks/${Date.now()}-${file.originalname}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_ORIGINALS_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return fileKey;
};

const getImageUrl = async (fileKey, useResizedBucket = false) => {
  if (!fileKey) return null;

  const bucket = useResizedBucket
    ? process.env.S3_RESIZED_BUCKET
    : process.env.S3_ORIGINALS_BUCKET;

  const command = new GetObjectCommand({ Bucket: bucket, Key: fileKey });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

const deleteFileFromS3 = async (fileKey, useResizedBucket = false) => {
  if (!fileKey) return;

  const bucket = useResizedBucket
    ? process.env.S3_RESIZED_BUCKET
    : process.env.S3_ORIGINALS_BUCKET;

  await s3Client.send(
    new DeleteObjectCommand({ Bucket: bucket, Key: fileKey })
  );
};

const deleteTaskImages = async (task) => {
  if (!task) return;
  if (task.imageKey) await deleteFileFromS3(task.imageKey, false);
  if (task.resizedImageKey) await deleteFileFromS3(task.resizedImageKey, true);
};

module.exports = {
  uploadFileToS3,
  getImageUrl,
  deleteFileFromS3,
  deleteTaskImages,
};
