export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vehicles',
    port: process.env.port || 5050,
    sqsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '123',
    sqsSecretKeyId: process.env.AWS_SECRET_KEY || '123',
    sqsRegion: process.env.REGION || "us-east-1",
    sqsURLDate: process.env.SQS_URL_DATE || 'http://localhost:4566/000000000000/data-reference-queue',
    sqsURLManufacturer: process.env.SQS_URL_MANUFACTURER || 'http://localhost:4566/000000000000/manufacturer-queue'

}