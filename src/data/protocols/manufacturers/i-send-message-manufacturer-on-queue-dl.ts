export interface ISendMessageManufacturerOnQueueDl {
    sendMessageManufacturer<T>(payload: T):Promise<any>
}