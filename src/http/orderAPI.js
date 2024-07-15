import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $host.post('api/ordertype', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/ordertype' )
    return data
}

export const createOrder = async (order) => {
    const {data} = await $host.post('api/order', order)
    return data
}

export const fetchOrders = async (typeId) => {
    const {data} = await $host.get('api/order', {params: {
            typeId
        }})
    return data
}

export const fetchOneOrder = async (id) => {
    const {data} = await $host.get('api/order/' + id)
    return data
}