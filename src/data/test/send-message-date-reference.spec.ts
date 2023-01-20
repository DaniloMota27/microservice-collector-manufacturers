import {
    ISendMessageManufacturerOnQueueDl
} from "@/data/protocols/manufacturers/i-send-message-manufacturer-on-queue-dl";
import {expect} from "@jest/globals";
import {SendMessageManufacturerOnQueueImplementationDl} from "@/data/manufacturers/send-message-manufacturer-on-queue-implementation.dl";

type TypeOfSut = {
    sut: SendMessageManufacturerOnQueueImplementationDl
    sendMessageDateReferenceStub: ISendMessageManufacturerOnQueueDl
}
class SendMessageDateReferenceStub implements ISendMessageManufacturerOnQueueDl {
    async sendMessageManufacturer<DateReference>(payload: DateReference): Promise<Boolean> {
        return Promise.resolve(true);
    }


}
const makeSut = () : TypeOfSut => {
    const sendMessageDateReferenceStub = new SendMessageDateReferenceStub()
    const sut = new SendMessageManufacturerOnQueueImplementationDl(sendMessageDateReferenceStub)
    return { sut, sendMessageDateReferenceStub}
}
describe('SendMessageDateReferenceOnQueueImplementationDl', () => {
    test('Should return true if send payload correct', async () => {
        const {sut} = makeSut()
        const payload : any =  { dateId: 266, month: "março/2021 ", checkStatus: false, manufacturerId: 163, manufacturerName: "Wake" }
        const response = await sut.execute<any>(payload)
        expect(response).toBe(true)
    })
})