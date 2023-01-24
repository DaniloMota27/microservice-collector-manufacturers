import {StateOfMachine} from "./config/models/state-of-machine";
import {IFsmTransition} from "./protocols/i-fsm-transition";
import {EventOfMachine} from "./config/models/event-of-machine";
import {fipeFsm} from "./config/state-machines/fipe-fsm";
import {ICheckDataOnWebsiteUseCase} from "../../domain/usecases/manufacturers/i-check-data-on-website-use-case";
import {FipeDto} from "../../domain/entities/dto/fipe-dto";
import {TypeOfVehicle} from "../../domain/entities/enum/type-of-vehicle";
import {IParseObjectUseCase} from "../../domain/usecases/parse/i-parse-object-use-case";
import {Manufacturer} from "../../domain/entities/manufacturers/manufacturer";
import {ICreateManufacturerUseCase} from "../../domain/usecases/manufacturers/i-create-manufacturer-use-case";
import {
    ISendMessageManufacturerToQueueUseCase
} from "../../domain/usecases/manufacturers/i-send-message-manufacturer-to-queue-use-case";
import {Logger} from "tslog";


export class FipeFSM implements IFsmTransition {
    private readonly checkDataOnWebSite: ICheckDataOnWebsiteUseCase
    private readonly parseObject: IParseObjectUseCase
    private readonly createManufacturer: ICreateManufacturerUseCase
    private readonly sendManufacturer: ISendMessageManufacturerToQueueUseCase

    constructor(
        checkDataOnWebSite: ICheckDataOnWebsiteUseCase,
        parseObject: IParseObjectUseCase,
        createManufacturer: ICreateManufacturerUseCase,
        sendManufacturer: ISendMessageManufacturerToQueueUseCase
    ) {
        this.checkDataOnWebSite = checkDataOnWebSite
        this.parseObject = parseObject
        this.createManufacturer = createManufacturer
        this.sendManufacturer = sendManufacturer
    }

    async transition(state: StateOfMachine, event: EventOfMachine, context: any): Promise<any> {
        const logger = new Logger({hideLogPositionForProduction: true})
        const nextStateNode = fipeFsm.states[state.status].on?.[event.type] ?? {target: state.status};
        const nextState = {
            ...state,
            status: nextStateNode.target.status,
        };
        if (event.type === "FINAL") {
            logger.info(`stopped: state machine - ${new Date()}`)

            return context
        }
        for (let action of nextStateNode.actions) {
            logger.info(`Starting ${action.type} - ${new Date()}`)
            if (action.type === 'getManufacturer') {

                const {dateId, month, checkStatus} = JSON.parse(context.date.Body)
                const payload: FipeDto = {codigoTabelaReferencia: dateId, codigoTipoVeiculo: TypeOfVehicle.CAR}
                const arrayManufacturer = await this.checkDataOnWebSite.execute<any>(JSON.stringify(payload))
                context.manufacturer = {
                    dateId: dateId,
                    month: month,
                    checkStatus: checkStatus,
                    manufacturers: arrayManufacturer.message
                }
            }
            if (action.type === 'parseManufacturer') {
                const arr = []
                const parsedManufacturers = await this.parseObject.execute<Array<Manufacturer>>(context.manufacturer.manufacturers)
                for (let objectParsed of parsedManufacturers) {
                    arr.push({
                        dateId: context.manufacturer.dateId,
                        month: context.manufacturer.month,
                        checkStatus: context.manufacturer.checkStatus,
                        manufacturerId: objectParsed.manufacturerId,
                        manufacturerName: objectParsed.manufacturerName
                    })

                }
                delete context.manufacturer
                context.manufacturer = arr
            }
            if (action.type === 'createManufacturer') {
                for (let manufacturer of context.manufacturer) {
                    await this.createManufacturer.execute<any>(manufacturer)
                    logger.info(`Create manufacturer on db - dateReference: ${manufacturer.dateId} manufacturerId: ${manufacturer.manufacturerId} manufacturerName: ${manufacturer.manufacturerName}`)
                }
            }
            if (action.type === 'sendToQueue') {
                for (let manufacturer of context.manufacturer) {
                    await this.sendManufacturer.execute<any>(manufacturer)
                    logger.info(`Send message to queue - dateReference: ${manufacturer.dateId} manufacturerId: ${manufacturer.manufacturerId} manufacturerName: ${manufacturer.manufacturerName}`)
                }


            }

        }

        return await this.transition({status: nextState.status}, {type: nextStateNode.target.type}, context)
    }

}

