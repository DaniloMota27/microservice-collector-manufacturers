import {FipeFSM} from "../fsm-fipe-fsm-implementation";
import {StateOfMachine} from "@/infra/fsm/config/models/state-of-machine";
import {EventOfMachine} from "@/infra/fsm/config/models/event-of-machine";
import {fipeFsm} from "@/infra/fsm/config/state-machines/fipe-fsm";
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
        return true as T;
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
    test('Should call function transition with config correct', () => {
        const state: StateOfMachine = {status: 'idle'}
        const eventOfMachine: EventOfMachine = {type: 'GET_DATE'}
        const {sut} = makeSut()
        expect(sut.transition({status: 'idle'}, {type: 'GET_DATE'}, {})).toBeTruthy()
    })
    test('Should call function transition with config correct', () => {
        const state: StateOfMachine = {status: 'idle'}
        const eventOfMachine: EventOfMachine = {type: 'GET_DATE'}
        const {sut} = makeSut()
        sut.transition(state, eventOfMachine, {})
        const spy = jest.spyOn(sut, "transition",).mockImplementation(
            (status: { status: 'idle' }, eventOfMachine: { type: 'GET_DATE' }, context: {}): Promise<any> => {
                const nextStateNode = fipeFsm.states[state.status].on?.[eventOfMachine.type] ?? {target: state.status};
                return nextStateNode

            }
        )
        expect(spy).toBeTruthy()
    })

});