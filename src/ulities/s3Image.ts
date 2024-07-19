import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: 'AKIAU6GDXK42C64MDZFU',
    secretAccessKey: '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',
  },
});
const bucketName = 'swpproject'
export async function uploadImage(file: File, key: string): Promise<Boolean> {
  const uploadParams = {
    Bucket: 'swpproject',
    Key: key,
    Body: file,
    ContentType: file.type,
 
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded successfully', data);
    return true;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}
