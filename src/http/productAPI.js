import {$authHost, $host} from "./index";

export const createProduct = async (product) => {
    const {data} = await $host.post('api/product', product)
    return data
}

export const fetchProducts = async () => {
    const {data} = await $host.get('api/product')
    return data
}

export const fetchProduct = async (id) => {
    const {data} = await $host.get('api/product' + id)
    return data
}