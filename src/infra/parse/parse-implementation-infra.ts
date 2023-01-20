import {IParseObjectDl} from "../../data/protocols/manufacturers/i-parse-object-dl";

export class ParseImplementationInfra implements IParseObjectDl {
    convertToDomain<T>(payload: T): T {
        const arr: Array<any> = []
        const parsedObject = payload as any
        if(Array.isArray(payload)) {
            for (let object of parsedObject){
                arr.push({ manufacturerId: parseInt(object.Value), manufacturerName: object.Label})
            }
            return arr as T
        }
        arr.push({ manufacturerId: parseInt(parsedObject.Value), manufacturerName: parsedObject.Label})
        return arr as T
    }

}
