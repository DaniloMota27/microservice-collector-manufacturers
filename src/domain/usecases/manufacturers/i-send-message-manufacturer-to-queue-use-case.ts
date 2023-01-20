export interface ISendMessageManufacturerToQueueUseCase {
    execute<T>(payload: T): Promise<Boolean>
}