import {ConfigStateMachine} from "../models/config-state-machine";

export const fipeFsm : ConfigStateMachine = {
    initial: 'idle',
    states: {
        idle: {
            on: {
                GET_MANUFACTURER: {
                    target: {status: 'parseManufacturer', type: 'PARSE_MANUFACTURER'},
                    actions: [
                        {type: 'getManufacturer'}
                    ]
                },
                FINAL: {
                    target: {status: 'idle', type: 'FINAL'},
                    actions: [
                        {type: 'final'}
                    ]
                }
            }
        },
        parseManufacturer: {
            on: {
                PARSE_MANUFACTURER: {
                    target: {status: 'createManufacturer', type: 'CREATE_MANUFACTURER'},
                    actions: [
                        {type: 'parseManufacturer'}
                    ]
                }
            }
        },

        createManufacturer: {
            on: {
                CREATE_MANUFACTURER: {
                    target: {status: 'sendToQueue', type: 'SEND_TO_QUEUE'},
                    actions: [
                        {type: 'createManufacturer'}
                    ]
                }
            }
        },
        sendToQueue: {
            on: {
                SEND_TO_QUEUE: {
                    target: {status: 'idle', type: 'FINAL'},
                    actions: [
                        {type: 'sendToQueue'}
                    ]
                }
            }
        },

    },
}