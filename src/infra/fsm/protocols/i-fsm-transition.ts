import {StateOfMachine} from "@/infra/fsm/config/models/state-of-machine";
import {EventOfMachine} from "@/infra/fsm/config/models/event-of-machine";


export interface IFsmTransition {
    transition(state: StateOfMachine, event: EventOfMachine, context: any): Promise<any>
}