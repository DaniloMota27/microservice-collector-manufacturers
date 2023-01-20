export interface ICheckDataOnWebsiteUseCase {
    execute<T>(payload: T) : Promise<T>
}