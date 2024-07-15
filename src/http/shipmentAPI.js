import {$authHost, $host} from "./index";



export const createShipment = async (order) => {
    const {data} = await $host.post('api/shipment', order)
    return data
}

export const fetchShipments = async (typeId) => {
    const {data} = await $host.get('api/shipment', )
    return data
}

export const fetchOneShipment = async (id) => {
    const {data} = await $host.get('api/shipment/' + id)
    return data
}