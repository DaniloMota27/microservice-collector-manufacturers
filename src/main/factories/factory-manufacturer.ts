import {FipeFSM} from "../../infra/fsm/fsm-fipe-fsm-implementation";


import {CheckManufacturerImplementationInfra} from "../../infra/fetch/manufacturer/check-manufacturer-implementation-infra";
import {CheckDataOnWebSiteImplementationDl} from "../../data/manufacturers/check-data-on-web-site-implementation-dl";
import {ParseImplementationInfra} from "../../infra/parse/parse-implementation-infra";
import {ParseObjectImplementationDl} from "../../data/manufacturers/parse-object-implementation-dl";
import {
    CreateManufacturerRepositoryImplementationInfra
} from "../../infra/db/mongodb/manufacturer/create-manufacturer-repository-implementation-infra";
import {CreateManufacturerImplementationDl} from "../../data/manufacturers/create-manufacturer-implementation.dl";
import {
    SendMessageManufacturerImplementationInfra
} from "../../infra/streaming/sqs/manufacturers/send-message-manufacturer-implementation-infra";
import {
    SendMessageManufacturerOnQueueImplementationDl
} from "../../data/manufacturers/send-message-manufacturer-on-queue-implementation.dl";

export const makeManufacturerFactory = () : FipeFSM => {
    const checkDataOnWebSiteInfra = new CheckManufacturerImplementationInfra()
    const checkDataOnWebSiteDl = new CheckDataOnWebSiteImplementationDl(checkDataOnWebSiteInfra)
    const parsedManufacturerInfra = new ParseImplementationInfra()
    const parsedManufacturerDl = new ParseObjectImplementationDl(parsedManufacturerInfra)
    const createManufacturerInfra = new CreateManufacturerRepositoryImplementationInfra()
    const createManufacturerDl = new CreateManufacturerImplementationDl(createManufacturerInfra)
    const sendMessageManufacturerInfra = new SendMessageManufacturerImplementationInfra()
    const sendMessageManufacturerDl = new SendMessageManufacturerOnQueueImplementationDl(sendMessageManufacturerInfra)
    const fsmFipeImplementation = new FipeFSM(checkDataOnWebSiteDl, parsedManufacturerDl, createManufacturerDl, sendMessageManufacturerDl)
    return fsmFipeImplementation
}