import {IParseObjectUseCase} from "@/domain/usecases/parse/i-parse-object-use-case";
import {IParseObjectDl} from "@/data/protocols/manufacturers/i-parse-object-dl";


export class ParseObjectImplementationDl implements IParseObjectUseCase{
    private readonly parseObject : IParseObjectDl
    constructor( parseObject : IParseObjectDl) {
        this.parseObject = parseObject
    }

  execute<T>(payload: T ): T {

        return this.parseObject.convertToDomain<T>(payload)
    }

}