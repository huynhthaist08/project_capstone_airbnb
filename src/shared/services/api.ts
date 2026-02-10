import axios from 'axios';
import { STORAGE_KEYS } from '@/constants'

const baseURL = import.meta.env.VITE_BASE_URL || 'https://airbnbnew.cybersoft.edu.vn/api'
const tokenCybersoft = import.meta.env.VITE_TOKEN_CYBERSOFT

console.log('API Config:', { baseURL, tokenExists: !!tokenCybersoft })

const apiInstance = axios.create({
    baseURL
})

// middleware to add headers
// tất cả các request đều phải qua middleware 
apiInstance.interceptors.request.use((config) => {
    // Add CyberSoft token from env
    if (tokenCybersoft) {
        config.headers.TokenCybersoft = tokenCybersoft
    }
    
    // Add user access token from localStorage nếu có
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
});

apiInstance.interceptors.response.use(
    (res) => res,
   
    (error) => {
        if (error.response?.status === 401) {
            // logout user
            // chuyển hướng về trang đăng nhập
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        }
    }
)

export default apiInstance