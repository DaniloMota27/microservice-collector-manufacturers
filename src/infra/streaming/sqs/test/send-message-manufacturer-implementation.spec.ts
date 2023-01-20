import {
    SendMessageManufacturerImplementationInfra
} from "@/infra/streaming/sqs/manufacturers/send-message-manufacturer-implementation-infra";


type TypeOfSut = {
    sut : SendMessageManufacturerImplementationInfra
}


const makeSut = () : TypeOfSut => {
    const sut = new SendMessageManufacturerImplementationInfra()
    return {sut}

}
describe("SendManufacturerImplementationInfra", () => {
    it('Should return a valid string', async () => {
        const {sut} = makeSut()
        const payload : any =  { dateId: 266, month: "março/2021 ", checkStatus: false, manufacturerId: 163, manufacturerName: "Wake" }
        const response = await sut.sendMessageManufacturer(payload)
        expect(response).toBeTruthy()
    })
})