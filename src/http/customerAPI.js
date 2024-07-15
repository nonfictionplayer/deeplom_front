import {$authHost, $host} from "./index";

export const createCustomer = async (customer) => {
    const {data} = await $host.post('api/customer', customer)
    return data
}

export const fetchCustomers= async () => {
    const {data} = await $host.get('api/customer')
    return data
}

export const fetchCustomer = async (id) => {
    const {data} = await $host.get('api/customer' + id)
    return data
}