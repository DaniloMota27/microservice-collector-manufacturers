import {ParseObjectImplementationDl} from "@/data/manufacturers/parse-object-implementation-dl";
import {IParseObjectDl} from "@/data/protocols/manufacturers/i-parse-object-dl";
import {Manufacturer} from "@/domain/entities/manufacturers/manufacturer";
import {FipeManufacturerDto} from "@/domain/entities/dto/fipe-manufacturer-dto";

type TypeOfSut = {
    sut : ParseObjectImplementationDl
    parseObjectStub: IParseObjectDl
}


class ParseObjectStub implements  IParseObjectDl {
    convertToDomain<T>(payload: T): T {
        const object: Manufacturer = {manufacturerId: 9, manufacturerName: "Buggy"}
        return  [object]as T
    }

}

const makeSut = () : TypeOfSut => {
    const parseObjectStub = new ParseObjectStub()
    const sut = new ParseObjectImplementationDl(parseObjectStub)
    return {sut, parseObjectStub}
}

describe('ParseObjectImplementationDl', () => {
    test("Should return any object if call funcation", () => {
        const {sut} = makeSut()
        const payload : FipeManufacturerDto = {
         Label: 'Buggy', Value: '9'
        }
        const object: Manufacturer = {manufacturerId: 9, manufacturerName: "Buggy"}
        const response = sut.execute<FipeManufacturerDto>(payload)
        expect(response).toEqual([object])

    })

});