import {ICheckDataOnWebsiteUseCase} from "@/domain/usecases/manufacturers/i-check-data-on-website-use-case";
import {ICheckDataOnWebSiteDl} from "@/data/protocols/manufacturers/i-check-data-on-web-site-dl";

export class CheckDataOnWebSiteImplementationDl implements ICheckDataOnWebsiteUseCase {
    private readonly checkDataOnWebSite: ICheckDataOnWebSiteDl

    constructor(checkDataOnWebSite: ICheckDataOnWebSiteDl) {
        this.checkDataOnWebSite = checkDataOnWebSite
    }

    async execute<T>(payload: T): Promise<T> {
        return await this.checkDataOnWebSite.getDataOnWebSite<T>(payload) as T
    }
}