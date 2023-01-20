export interface IParseObjectUseCase {
    execute<T>(payload: T) : Promise<T>
}