import axios from "axios";
import API_URL from "../src/config/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const url = config.url || ''

    if (url.includes('/api/auth/me')) {
        config.headers = {
            ...config.headers,
            'Cache-Control': 'no-cache',
        }
    }

    return config
}, (error) => Promise.reject(error))

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        const url = error?.config?.url || ''
        const isAuthEndpoint = /\/api\/auth\/(login|register|me)$/.test(url)

        if (status === 401 && !isAuthEndpoint && typeof window !== 'undefined') {
            window.location.assign('/')
        }

        return Promise.reject(error)
    }
)

export default api