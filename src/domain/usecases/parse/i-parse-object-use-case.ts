export interface IParseObjectUseCase {
    execute<T>(payload: T) : T
}