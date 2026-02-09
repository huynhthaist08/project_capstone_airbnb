import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'https://airbnbnew.cybersoft.edu.vn/api'
const token = import.meta.env.VITE_TOKEN_CYBERSOFT

console.log('API Config:', { baseURL, tokenExists: !!token })

const apiInstance = axios.create({
    baseURL
})

// middleware to add headers
// tất cả các request đều phải qua middleware 
apiInstance.interceptors.request.use((config) => {
    if (token) {
        config.headers.TokenCybersoft = token
    }
    return config
});

apiInstance.interceptors.response.use(
    (res) => res,
   
    (error) => {
        if (error.response?.status === 401) {
            // logout user
            // chuyển hướng về trang đăng nhập
        }
    }
)

export default apiInstance