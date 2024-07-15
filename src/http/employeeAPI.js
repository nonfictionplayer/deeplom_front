import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password) => {
    const {data} = await $host.post('api/employee/registration', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/employee/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $host.get('api/employee/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}