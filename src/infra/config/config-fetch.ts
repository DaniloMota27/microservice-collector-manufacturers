export const ConfigFetch = {
    getManufacturer : {url: "https://veiculos.fipe.org.br/api/veiculos//ConsultarMarcas",
    configRequest  : {
        method: 'POST',
        body: null,
        headers: {'Content-Type': 'application/json'}
        }
    },
    getDateReference: {
        url: "https://veiculos.fipe.org.br/api/veiculos//ConsultarTabelaDeReferencia",
        configRequest: {
            method: 'POST',
            body: null,
            headers: {'Content-Type': 'application/json'}
        }
    },
    getModelsOfVehicles: {
        url: "https://veiculos.fipe.org.br/api/veiculos//ConsultarModelos",
        configRequest: {
            method: 'POST',
            body: null,
            headers: {'Content-Type': 'application/json'}
        }
    },
    getYearsPerModels: {
        url: "https://veiculos.fipe.org.br/api/veiculos//ConsultarAnoModelo",
        configRequest: {
            method: 'POST',
            body: null,
            headers: {'Content-Type': 'application/json'}
        }
    },
    getAllInformationByDate: {
        url: "https://veiculos.fipe.org.br/api/veiculos//ConsultarValorComTodosParametros",
        configRequest: {
            method: 'POST',
            body: null,
            headers: {'Content-Type': 'application/json'}
        }
    }
}
