import AWS from 'aws-sdk'
import {Consumer} from "sqs-consumer";
import process from "process";
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
            endpoint: 'http://localhost:4566/',
            credentials: {
                accessKeyId: '123',
                secretAccessKey: '123',

            },
        })
        const consumer = await Consumer.create({
            queueUrl: process.env.SQS_URL_DATE,
            sqs: sqsClient,
            handleMessage: async (date) => {
                const stateMachine = makeManufacturerFactory()
                await stateMachine.transition({status: 'idle'}, {type: 'GET_MANUFACTURER'}, {date})
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