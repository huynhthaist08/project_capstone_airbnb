/**
 * shared/services/api.ts
 * Instance Axios dùng chung cho mọi API: tự gắn baseURL, tokenCybersoft và Bearer token từ localStorage.
 * Interceptor response chỉ log lỗi (không tự ý clear localStorage hay redirect).
 */
import { APP_CONFIG } from "@/config";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import axios from "axios";

const apiInstance = axios.create();

// Mọi request đều gắn baseURL, header tokenCybersoft và Authorization (Bearer <access_token>).
apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    console.log(
        `📤 API Request: ${config.method?.toUpperCase()} ${APP_CONFIG.BASE_URL}${config.url}`,
        {
            data: config.data,
            headers: config.headers,
        },
    );
    return {
        ...config,
        baseURL: APP_CONFIG.BASE_URL,
        headers: {
            ...config.headers,
            // Đặt đúng tên header theo swagger: tokenCybersoft
            tokenCybersoft: APP_CONFIG.TOKEN_CYBERSOFT,
            // Chỉ gắn Authorization khi đã có token hợp lệ
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    } as unknown as typeof config;
});

apiInstance.interceptors.response.use(
    (res) => {
        console.log(`✅ API Response: ${res.status}`, {
            url: res.config.url,
            data: res.data,
        });
        return res;
    },
    (error) => {
        console.error(`❌ API Error: ${error.response?.status}`, {
            url: error.config?.url,
            message: error.message,
            data: error.response?.data,
        });
        // Không tự động clear localStorage hoặc redirect; để tầng UI tự xử lý.
        return Promise.reject(error);
    },
);

export default apiInstance;
