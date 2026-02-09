import { APP_CONFIG } from "@/config";
import { STORAGE_KEYS } from "@/constants/storageKeys";
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
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || ""}`,
        },
    } as unknown as typeof config;
});

apiInstance.interceptors.response.use(
    // Data trả về nếu thành công
    (res) => res,

    // Xử lý lỗi khi gọi API thất bại
    (error) => {
        // Xử lý lỗi 401 unAuthorized
        if (error.response?.status === 401) {
            // Gọi API refresh token
            // Đá user về trang đăng nhập
        }
    },
);

export default apiInstance;
