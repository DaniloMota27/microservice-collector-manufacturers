export interface ICreateManufacturerUseCase {
    execute <T>(payload: T): Promise<T>
}