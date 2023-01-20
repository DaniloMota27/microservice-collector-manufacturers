import {ICheckDataOnWebSiteDl} from "@/data/protocols/manufacturers/i-check-data-on-web-site-dl";
import {Manufacturer} from "@/domain/entities/manufacturers/manufacturer";
import {CheckDataOnWebSiteImplementationDl} from "@/data/manufacturers/check-data-on-web-site-implementation-dl";
import {FipeDto} from "@/domain/entities/dto/fipe-dto";


type TypeOfSut = {
    sut: CheckDataOnWebSiteImplementationDl
    checkDataOnWebSiteDlStub: ICheckDataOnWebSiteDl
}

const payloadMock: Manufacturer = {
    manufacturerName: "Acura",
    manufacturerId: 1
}

class CheckDataOnWebSiteDlStub implements ICheckDataOnWebSiteDl {
    async getDataOnWebSite<T>(payload: T): Promise<T> {
        return Promise.resolve([payloadMock] as T);
    }

}

const makeSut = (): TypeOfSut => {
    const checkDataOnWebSiteDlStub = new CheckDataOnWebSiteDlStub()
    const sut = new CheckDataOnWebSiteImplementationDl(checkDataOnWebSiteDlStub)
    return {
        checkDataOnWebSiteDlStub, sut
    }
}

describe('CheckDataOnWebSiteImplementationDl', () => {
    test('Should return array of manufacturer', async () => {

        const fipeMock =  {
            "codigoTabelaReferencia": 292,
            "codigoTipoVeiculo": 1
        }
        const {sut} = makeSut()
        const response = await sut.execute<FipeDto>(fipeMock)
        expect(response).toEqual([payloadMock])
    })
});