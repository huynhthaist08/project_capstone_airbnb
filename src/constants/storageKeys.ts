/**
 * constants/storageKeys.ts
 * Key dùng để lưu/đọc token và user trong localStorage.
 * ACCESS_TOKEN: key chính dùng bởi api interceptor và Redux auth slice. AUTH_USER_KEY: lưu object user.
 */
export const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
};

export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_KEY = "auth_user";
