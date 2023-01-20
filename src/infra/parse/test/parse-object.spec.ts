import {ParseImplementationInfra} from "@/infra/parse/parse-implementation-infra";
import {FipeManufacturerDto} from "@/domain/entities/dto/fipe-manufacturer-dto";

type TypeOfSut = {
    sut : ParseImplementationInfra,

}

const makeSut = (): TypeOfSut => {
    const sut = new ParseImplementationInfra()
    return {sut}
}

describe('ParseImplementationInfra', () => {
    test('Should return array parsed with called passed array object', () => {
        const {sut} = makeSut()
        const payloadMock: Array<FipeManufacturerDto> =  [{ Label: 'Porsche', Value: '47' }]
        const response = sut.convertToDomain(payloadMock)
        expect(response).toEqual([{ manufacturerId: 47, manufacturerName: 'Porsche' }])
    })
    test('Should return array parsed with called passed object', () => {
        const {sut} = makeSut()
        const payloadMock: FipeManufacturerDto =  { Label: 'Porsche', Value: '47' }
        const response = sut.convertToDomain(payloadMock)
        expect(response).toEqual([{ manufacturerId: 47, manufacturerName: 'Porsche' }])
    })
})