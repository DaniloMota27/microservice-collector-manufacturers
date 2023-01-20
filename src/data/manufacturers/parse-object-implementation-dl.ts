import {IParseObjectUseCase} from "@/domain/usecases/parse/i-parse-object-use-case";
import {IParseObjectDl} from "@/data/protocols/manufacturers/i-parse-object-dl";


export class ParseObjectImplementationDl implements IParseObjectUseCase{
    private readonly parseObject : IParseObjectDl
    constructor( parseObject : IParseObjectDl) {
        this.parseObject = parseObject
    }

  async execute<T>(payload: T ): Promise<T> {

        return await this.parseObject.convertToDomain<T>(payload)
    }

}