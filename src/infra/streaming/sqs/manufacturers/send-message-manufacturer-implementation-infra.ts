import {
    ISendMessageManufacturerOnQueueDl
} from "../../../../data/protocols/manufacturers/i-send-message-manufacturer-on-queue-dl";
import {sqsHelper} from "../helpers/sqs-helper";

export class SendMessageManufacturerImplementationInfra implements ISendMessageManufacturerOnQueueDl {
    async sendMessageManufacturer<T>(payload: T): Promise<any> {
        const url = process.env.SQS_URL_MANUFACTURER || 'http://localhost:4566/000000000000/manufacturer-queue'
        return await sqsHelper.sendMessage(payload, url)
    }
}