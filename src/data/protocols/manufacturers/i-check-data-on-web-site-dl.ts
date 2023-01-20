import {Manufacturer} from "@/domain/entities/manufacturers/manufacturer";

export interface ICheckDataOnWebSiteDl {
    getDataOnWebSite<T>(payload: T) : Promise<T>
}