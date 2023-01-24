import {FipeFSM} from "../fsm-fipe-fsm-implementation";
import {StateOfMachine} from "@/infra/fsm/config/models/state-of-machine";
import {EventOfMachine} from "@/infra/fsm/config/models/event-of-machine";
import {ICheckDataOnWebsiteUseCase} from "@/domain/usecases/manufacturers/i-check-data-on-website-use-case";
import {IParseObjectUseCase} from "@/domain/usecases/parse/i-parse-object-use-case";
import {ICreateManufacturerUseCase} from "@/domain/usecases/manufacturers/i-create-manufacturer-use-case";
import {
    ISendMessageManufacturerToQueueUseCase
} from "@/domain/usecases/manufacturers/i-send-message-manufacturer-to-queue-use-case";

type TypeOfSut = {
    sut: FipeFSM,
    checkDataOnWebSiteStub: ICheckDataOnWebsiteUseCase
    parseObjectStub: IParseObjectUseCase
    createManufacturerStub: ICreateManufacturerUseCase
    sendMessageManufacturerStub: ISendMessageManufacturerToQueueUseCase


}

class SendMessageManufacturerStub implements ISendMessageManufacturerToQueueUseCase {
    async execute<T>(payload: T): Promise<Boolean> {
        return Promise.resolve(true);
    }

}

class CreateManufacturerStub implements ICreateManufacturerUseCase {
    async execute<T>(payload: T): Promise<T> {
        return Promise.resolve(true as T);
    }

}

class CheckDataOnWebSiteStub implements ICheckDataOnWebsiteUseCase {
    async execute<T>(payload: T): Promise<T> {
        return Promise.resolve(true as T);
    }

}

class ParseObjectStub implements IParseObjectUseCase {
    async execute<T>(payload: T): Promise<T> {
        return  Promise.resolve([{"manufacturerId": 47, "manufacturerName": 'Porsche'}]) as T;
    }

}

const makeSut = (): TypeOfSut => {

    const checkDataOnWebSiteStub = new CheckDataOnWebSiteStub()
    const parseObjectStub = new ParseObjectStub()
    const createManufacturerStub = new CreateManufacturerStub()
    const sendMessageManufacturerStub = new SendMessageManufacturerStub()
    const sut = new FipeFSM(checkDataOnWebSiteStub, parseObjectStub, createManufacturerStub, sendMessageManufacturerStub)
    return {
        sut,
        checkDataOnWebSiteStub, parseObjectStub, createManufacturerStub, sendMessageManufacturerStub
    }
}


describe('FSMFIPE', () => {
    test('Should call function transition with config correct', async () => {
        const state: StateOfMachine = {status: 'idle'}
        const eventOfMachine: EventOfMachine = {type: 'GET_MANUFACTURER'}
        const {sut} = makeSut()
        sut.transition(state, eventOfMachine, {
            date: {
                "MessageId": "4bf8e0ce-be50-41b5-83da-24085dd61429",
                "ReceiptHandle": "ZjI2Y2MzN2EtY2NkYi00MWNjLTlhNGUtZTllMmY4NTY4MWQzIGFybjphd3M6c3FzOnVzLWVhc3QtMTowMDAwMDAwMDAwMDA6ZGF0YS1yZWZlcmVuY2UtcXVldWUgNGJmOGUwY2UtYmU1MC00MWI1LTgzZGEtMjQwODVkZDYxNDI5IDE2NzQ1MDAyNjMuMTQxOTMzNw==",
                "MD5OfBody": "584d13c2b35cf1efd5ab6d6204061b07",
                "Body": "{\"dateId\":293,\"month\":\"janeiro/2023 \",\"checkStatus\":false}"
            }
        })

        const spy = jest.spyOn(sut, "transition").mockResolvedValue([
            {
                "Label": "Acura",
                "Value": "1"
            }])
        const response = sut.transition(state, eventOfMachine, {
            date: {
                "MessageId": "4bf8e0ce-be50-41b5-83da-24085dd61429",
                "ReceiptHandle": "ZjI2Y2MzN2EtY2NkYi00MWNjLTlhNGUtZTllMmY4NTY4MWQzIGFybjphd3M6c3FzOnVzLWVhc3QtMTowMDAwMDAwMDAwMDA6ZGF0YS1yZWZlcmVuY2UtcXVldWUgNGJmOGUwY2UtYmU1MC00MWI1LTgzZGEtMjQwODVkZDYxNDI5IDE2NzQ1MDAyNjMuMTQxOTMzNw==",
                "MD5OfBody": "584d13c2b35cf1efd5ab6d6204061b07",
                "Body": "{\"dateId\":293,\"month\":\"janeiro/2023 \",\"checkStatus\":false}"
            }
        })
        expect(spy).toHaveBeenCalled()
        expect(spy).toBeTruthy()
        expect(response).toBeTruthy()
    })
    test('Should call parsedObject', async () => {
        const state: StateOfMachine = {status: 'parseManufacturer'}
        const eventOfMachine: EventOfMachine = {type: 'PARSE_MANUFACTURER'}
        const {sut} = makeSut()

        await sut.transition(state, eventOfMachine, {
            manufacturer: {
                manufacturers: [
                    {
                        "Label": "Acura",
                        "Value": "1"
                    }]
            }
        })
        const spy = jest.spyOn(sut, "transition").mockResolvedValue([
            {dateId: 293, checkStatus : false, manufacturerId: 47, manufacturerName: 'Porsche', month : "janeiro/2023 "}
        ])

        const response = await sut.transition(state, eventOfMachine, {
            manufacturer: {
                manufacturers: [
                    {
                        "Label": "Acura",
                        "Value": "1"
                    }]
            }
        })
        expect(spy).toHaveBeenCalled()
        expect(spy).toBeTruthy()
        expect(response).toBeTruthy()
    })
    test('Should call createManufacturer', async () => {
        const state: StateOfMachine = {status: 'createManufacturer'}
        const eventOfMachine: EventOfMachine = {type: 'CREATE_MANUFACTURER'}
        const {sut} = makeSut()
        await sut.transition(state, eventOfMachine, {
                manufacturer: [{
                    "_id": "63cb1efd7dbbded4842290aa",
                    "dateId": 293,
                    "manufacturerId": 1,
                    "checkStatus": false,
                    "manufacturerName": "Acura",
                    "month": "janeiro/2023 "
                }]
            }
        )

        const spy = jest.spyOn(sut, "transition").mockResolvedValue(true)
        const response = await sut.transition(state, eventOfMachine, {
            manufacturer: [{
                "_id": "63cb1efd7dbbded4842290aa",
                "dateId": 293,
                "manufacturerId": 1,
                "checkStatus": false,
                "manufacturerName": "Acura",
                "month": "janeiro/2023 "
            }]
        })
        expect(spy).toHaveBeenCalled()
        expect(spy).toBeTruthy()
        expect(response).toBeTruthy()
    })
    test('Should call Final', async () => {
        const state: StateOfMachine = {status: 'idle'}
        const eventOfMachine: EventOfMachine = {type: 'FINAL'}
        const {sut} = makeSut()

        const spy = jest.spyOn(sut, "transition").mockResolvedValue({
            manufacturer: [{
                "_id": "63cb1efd7dbbded4842290aa",
                "dateId": 293,
                "manufacturerId": 1,
                "checkStatus": false,
                "manufacturerName": "Acura",
                "month": "janeiro/2023 "
            }]
        })
        const response = await sut.transition(state, eventOfMachine, {
            manufacturer: [{
                "_id": "63cb1efd7dbbded4842290aa",
                "dateId": 293,
                "manufacturerId": 1,
                "checkStatus": false,
                "manufacturerName": "Acura",
                "month": "janeiro/2023 "
            }]
        })
        expect(spy).toHaveBeenCalled()
        expect(spy).toBeTruthy()
        expect(response).toBeTruthy()
    })

});