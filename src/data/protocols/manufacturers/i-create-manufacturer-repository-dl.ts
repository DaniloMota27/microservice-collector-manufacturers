export interface ICreateManufacturerRepositoryDl {
    createManufacturer<T>(payload: T): Promise<T>
}