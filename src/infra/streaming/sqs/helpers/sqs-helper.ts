import AWS from 'aws-sdk'
import {Consumer} from "sqs-consumer";
import {SQSClient} from '@aws-sdk/client-sqs';
import env from "../../../../main/config/env";
import {makeManufacturerFactory} from "../../../../main/factories/factory-manufacturer";

export const sqsHelper = {

    sendMessage: async (msg, queueUrl) => {
        const sqs = new AWS.SQS()
        try {
            const params = {
                MessageBody: JSON.stringify(msg),
                QueueUrl: queueUrl,
            };
            const res = await sqs.sendMessage(params).promise();
            return res;
        } catch (err) {
            return new Error(err);
        }
    },
    consumerConnect: async (): Promise<any> => {
        const sqsClient = new SQSClient({
            region: env.sqsRegion,
            endpoint: env.sqsEndPoint,
            credentials: {
                accessKeyId: env.sqsAccessKeyId,
                secretAccessKey: env.sqsAccessKeyId,
            },
        })
        const consumer = Consumer.create({
            queueUrl: env.sqsURLDate,
            sqs: sqsClient,
            handleMessage: async (date) => {
                const stateMachine = makeManufacturerFactory();
                await stateMachine.transition({status: 'idle'}, {type: 'GET_MANUFACTURER'}, {date});
            },
        })
        consumer.on('error', (err) => {
            console.error(err.message);
        })
        consumer.on('processing_error', (err) => {
            console.error(err.message);
        })
        consumer.start()
    }

}