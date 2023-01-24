import fetch, {Response} from "node-fetch";
import {HttpResponse} from "@/domain/entities/http/http-response";
import {CheckManufacturerImplementationInfra} from "@/infra/fetch/manufacturer/check-manufacturer-implementation-infra";
import {HttpRequest} from "@/domain/entities/http/http-request";

jest.mock('node-fetch')

interface TypeOfSut {
    sut: CheckManufacturerImplementationInfra
}

const makeSut = (): TypeOfSut => {
    const sut = new CheckManufacturerImplementationInfra()
    return {sut}
}
describe('CheckManufacturer', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    test('Should return an array of Manufacturers', async () => {
        const {sut} = makeSut()
        const json = jest.fn() as jest.MockedFunction<any>
        const mockResponse: HttpResponse = {
            statusCode: 200, message: [
                {
                    "Label": "Acura",
                    "Value": "1"
                }]
        }
        const payload: HttpRequest = {
            body: {
                "codigoTabelaReferencia": 292,
                "codigoTipoVeiculo": 1
            }
        }
        json.mockResolvedValue(mockResponse)
        mockFetch.mockResolvedValue({ok: true, json} as Response);
        await sut.getDataOnWebSite<HttpRequest>(payload)
        expect(json.mock.calls.length).toBe(1)
    })
})