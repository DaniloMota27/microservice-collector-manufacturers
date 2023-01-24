import {ICheckDataOnWebSiteDl} from "../../../data/protocols/manufacturers/i-check-data-on-web-site-dl";
import {ConfigFetch} from "../../../infra/config/config-fetch";
import fetch from "node-fetch";

export class CheckManufacturerImplementationInfra implements ICheckDataOnWebSiteDl {
    async getDataOnWebSite<T>(payload: T): Promise<T> {
        ConfigFetch.getManufacturer.configRequest.body = payload
        const result = await fetch(ConfigFetch.getManufacturer.url, ConfigFetch.getManufacturer.configRequest)
        return Promise.resolve({statusCode: 200, message: await result.json()} as T);
    }

}