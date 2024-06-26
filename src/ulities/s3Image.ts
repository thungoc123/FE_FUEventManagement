import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: 'AKIAU6GDXK42BVEFEONO',
    secretAccessKey: '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',
  },
});
const bucketName = 'swpproject'
export async function uploadImage(file: File, key: string): Promise<string> {
  const uploadParams = {
    Bucket: 'swpproject',
    Key: key,
    Body: file,
    ContentType: file.type,
    // ACL: 'public-read' as ObjectCannedACL,
     // Điều chỉnh theo yêu cầu của bạn
  };
  
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(`File uploaded successfully`, data);
    return `https://${bucketName}.s3.${s3Client.config.region}.amazonaws.com/${key}`;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}