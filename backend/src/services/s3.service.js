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

const getImageUrl = async (fileKey) => {
  if (!fileKey) return null;

  const command = new GetObjectCommand({
    Bucket: process.env.S3_ORIGINALS_BUCKET,
    Key: fileKey,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

const deleteFileFromS3 = async (fileKey) => {
  if (!fileKey) return;

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_ORIGINALS_BUCKET,
      Key: fileKey,
    })
  );
};

module.exports = {
  uploadFileToS3,
  getImageUrl,
  deleteFileFromS3,
};