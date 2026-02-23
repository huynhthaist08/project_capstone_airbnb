import { APP_CONFIG } from "@/config";
import { STORAGE_KEYS, AUTH_USER_KEY } from "@/constants/storageKeys";
import axios from "axios";

const apiInstance = axios.create();

// Middleware
// -> Tất cả các request đều sẽ đi qua hàm này
apiInstance.interceptors.request.use((config) => {
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
    // Data trả về nếu thành công
    (res) => res,

    // Xử lý lỗi khi gọi API thất bại
    (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            // Token user hết hạn hoặc không đúng
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
