import {mongoHelper} from "@/infra/db/helpers/mongodb/mongo-helper";
import {
    CreateManufacturerRepositoryImplementationInfra
} from "@/infra/db/mongodb/manufacturer/create-manufacturer-repository-implementation-infra";

describe('CreateManufacturer', () => {
    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        await mongoHelper.disconnect()
    })
    test('Should return true if insert with success', async () => {
        const sut = new CreateManufacturerRepositoryImplementationInfra()
        const response = await sut.createManufacturer<any>({
            dateId: 62,
            month: 'janeiro/2001 ',
            checkStatus: false,
            manufacturerId: 58,
            manufacturerName: 'Volvo'
        })
        expect(response).toEqual(true)
    })

})