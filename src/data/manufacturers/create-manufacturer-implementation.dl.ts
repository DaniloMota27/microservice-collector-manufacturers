import {ICreateManufacturerUseCase} from "@/domain/usecases/manufacturers/i-create-manufacturer-use-case";
import {ICreateManufacturerRepositoryDl} from "@/data/protocols/manufacturers/i-create-manufacturer-repository-dl";

export class CreateManufacturerImplementationDl implements ICreateManufacturerUseCase {
    private readonly createManufacturer: ICreateManufacturerRepositoryDl

    constructor(createManufacturer: ICreateManufacturerRepositoryDl) {
        this.createManufacturer = createManufacturer
    }

    async execute<T>(payload: T): Promise<T> {
        return this.createManufacturer.createManufacturer<any>(payload);
    }
}