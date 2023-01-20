import {
    ISendMessageManufacturerToQueueUseCase
} from "@/domain/usecases/manufacturers/i-send-message-manufacturer-to-queue-use-case";
import {
    ISendMessageManufacturerOnQueueDl
} from "@/data/protocols/manufacturers/i-send-message-manufacturer-on-queue-dl";


export class SendMessageManufacturerOnQueueImplementationDl implements ISendMessageManufacturerToQueueUseCase {
    private readonly sendMessageDateReferenceToQueueDl : ISendMessageManufacturerOnQueueDl
    constructor(sendMessageDateReferenceToQueueDl : ISendMessageManufacturerOnQueueDl) {
        this.sendMessageDateReferenceToQueueDl = sendMessageDateReferenceToQueueDl
    }
    async execute<T>(payload: T): Promise<Boolean> {
        return await this.sendMessageDateReferenceToQueueDl.sendMessageManufacturer(payload)
    }

}