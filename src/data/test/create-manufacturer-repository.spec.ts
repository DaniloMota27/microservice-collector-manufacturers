import {ICreateManufacturerRepositoryDl} from "@/data/protocols/manufacturers/i-create-manufacturer-repository-dl";
import {CreateManufacturerImplementationDl} from "@/data/manufacturers/create-manufacturer-implementation.dl";

interface TypeOfSut {
    sut: CreateManufacturerImplementationDl
    createManufacturerStub: ICreateManufacturerRepositoryDl
}

class CreateManufacturerStub implements ICreateManufacturerRepositoryDl {
    async createManufacturer<T>(payload: T): Promise<T> {
        return Promise.resolve(true as T);
    }


}

const makeSut = (): TypeOfSut => {
    const createManufacturerStub = new CreateManufacturerStub()
    const sut = new CreateManufacturerImplementationDl(createManufacturerStub)
    return {sut, createManufacturerStub}
}
describe('Create Manufacturer UseCase', () => {
    test('Should called method to create a manufacturer.ts', async () => {
        const {sut, createManufacturerStub} = makeSut()
        const objManufacturer : any = {
            dateId: 62,
            month: 'janeiro/2001 ',
            checkStatus: false,
            manufacturerId: 58,
            manufacturerName: 'Volvo'
        }
        const createManufacturerSpy = jest.spyOn(createManufacturerStub, "createManufacturer")
        await sut.execute<any>(objManufacturer)
        await expect(createManufacturerSpy).toBeCalled()
    })
    test('Should return a boolean after create a manufacturer.ts', async () => {
        const {sut} = makeSut()
        const objManufacturer : any = {
            dateId: 62,
            month: 'janeiro/2001 ',
            checkStatus: false,
            manufacturerId: 58,
            manufacturerName: 'Volvo'
        }
        const response = await sut.execute<any>(objManufacturer)
        await expect(response).toEqual(true)
    })
})