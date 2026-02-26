/**
 * shared/services/api.ts
 * Instance Axios dùng chung cho mọi API: tự gắn baseURL, TokenCybersoft và Bearer token từ localStorage.
 * Interceptor response: khi 401/403 thì xóa token + user và redirect về trang đăng nhập.
 */
import { APP_CONFIG } from "@/config";
import { STORAGE_KEYS, AUTH_USER_KEY } from "@/constants/storageKeys";
import axios from "axios";

const apiInstance = axios.create();

// Mọi request đều gắn baseURL, header TokenCybersoft và Authorization (Bearer token).
apiInstance.interceptors.request.use((config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
        data: config.data,
        headers: config.headers,
    });
    return {
        ...config,
        baseURL: APP_CONFIG.BASE_URL,
        headers: {
            ...config.headers,
            TokenCybersoft: APP_CONFIG.TOKEN_CYBERSOFT,
            Authorization: `Bearer ${
                localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || ""
            }`,
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
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            // Token hết hạn hoặc không hợp lệ: xóa token + user, chuyển về đăng nhập
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(AUTH_USER_KEY);
            if (window.location.pathname !== "/dang-nhap") {
                window.location.href = "/dang-nhap";
            }
        }
        return Promise.reject(error);
    },
);

export default apiInstance;
