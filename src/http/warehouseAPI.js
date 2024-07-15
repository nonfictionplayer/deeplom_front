import {$authHost, $host} from "./index";

export const createWarehouse = async (warehouse) => {
    const {data} = await $host.post('api/warehouse', warehouse)
    return data
}

export const fetchWarehouse = async (id) => {
    const {data} = await $host.get('api/warehouse/' + id)
    return data
}

