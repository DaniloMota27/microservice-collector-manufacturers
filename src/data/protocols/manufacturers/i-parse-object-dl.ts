export interface IParseObjectDl {
    convertToDomain<T>(payload: T) : Promise<T>
}