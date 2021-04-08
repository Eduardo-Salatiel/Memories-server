const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const awsUploadImage = async (filePath, file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${filePath}`,
        Body: file
    }

    try {
        const response = await s3.upload(params).promise();
        return response.Location
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = awsUploadImage;