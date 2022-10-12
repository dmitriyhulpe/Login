import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const APIURL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: APIURL
})

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${APIURL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (error) {
            console.log('User is not logged in')
        }
    }

    throw error
})

export default $api