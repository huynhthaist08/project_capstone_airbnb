/**
 * src/api/profile.api.ts
 * Module gọi API quản lý profile user: lấy/cập nhật thông tin, lấy danh sách booking
 */
import apiInstance from "@/shared/services/api";
import type {
  GetUserProfileResponse,
  GetUserBookingResponse,
  UpdateUserProfileResponse,
  UpdateUserProfileBody,
} from "@/pages/ProfilePage/servers/profile.type";

const PROFILE_API = {
  // Lấy thông tin profile của user theo ID
  getUserProfile: (userId: number) =>
    apiInstance.get<GetUserProfileResponse>(`/users/${userId}`),

  // Cập nhật thông tin profile user
  updateUserProfile: (userId: number, data: UpdateUserProfileBody) =>
    apiInstance.put<UpdateUserProfileResponse>(`/users/${userId}`, data),

  // Lấy danh sách tất cả đặt phòng của user
  getUserBookings: (userId: number) =>
    apiInstance.get<GetUserBookingResponse>(
      `/dat-phong/lay-theo-nguoi-dung/${userId}`
    ),

  // Upload/cập nhật avatar
  uploadAvatar: (userId: number, formData: FormData) =>
    apiInstance.post<GetUserProfileResponse>(
      `/users/${userId}/upload-avatar`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),
};

export default PROFILE_API;