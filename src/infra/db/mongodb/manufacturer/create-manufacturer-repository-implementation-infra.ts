import {ICreateManufacturerRepositoryDl} from "../../../../data/protocols/manufacturers/i-create-manufacturer-repository-dl";
import {mongoHelper} from "../../../../infra/db/helpers/mongodb/mongo-helper";


export class CreateManufacturerRepositoryImplementationInfra implements ICreateManufacturerRepositoryDl {
    async createManufacturer<T>(payload: T): Promise<T> {
        const castObject = payload as any
        const manufacturerCollection = mongoHelper.getCollection('manufacturers')
        if (Array.isArray(castObject)) {
            const checkArray = []
            for (let manufacturer of castObject) {
                const query = {dateId: manufacturer.dateId, manufacturerId: manufacturer.manufacturerId};
                const update = {$set: castObject};
                const options = {upsert: true};
                const idObject = (await manufacturerCollection.updateOne(query, update, options))
                checkArray.push(idObject !== null)
            }
            let checker = checkArray => checkArray.every(v => v === true);
            return checker as T

        }
        const query = {dateId: castObject.dateId, manufacturerId: castObject.manufacturerId};
        const update = {$set: castObject};
        const options = {upsert: true};
        const idObject = (await manufacturerCollection.updateOne(query, update, options))
        const check = idObject !== null
        return Promise.resolve(check as T)
    }
}