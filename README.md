# BC89 - Nhóm 1 - Website đặt phòng Airbnb

## Mô tả
Dự án **BC89 - Nhóm 1 - Website đặt phòng Airbnb** là ứng dụng web đặt phòng trực tuyến, cho phép người dùng:
- Tìm kiếm phòng theo vị trí, thời gian và nhu cầu lưu trú
- Xem chi tiết phòng, đặt phòng nhanh chóng
- Quản lý tài khoản cá nhân và lịch sử đặt phòng

Đồng thời, hệ thống cung cấp giao diện quản trị (**Admin**) để quản lý người dùng, phòng và đơn đặt phòng, phục vụ mục tiêu học tập, thực hành **React**, **TypeScript** và tích hợp **API** trong môi trường thực tế.

---

## Timeline
- **Bắt đầu:** 16/01/2026
- **Hoàn thành xây dựng chức năng:** 26/01/2026
- **Hoàn thành kiểm thử:** 28/01/2026

---

## Thành viên thực hiện

### Thạch Lâm Huỳnh Thái
- Phụ trách xây dựng giao diện ứng dụng người dùng (client)
- Tham gia hỗ trợ thiết kế và triển khai logic xử lý API, quản lý luồng dữ liệu phía client

### Nguyễn Hồng Thắm
- Phụ trách xây dựng giao diện quản trị hệ thống (admin dashboard)
- Thiết kế và triển khai chính về logic xử lý API cho các chức năng quản lý và luồng dữ liệu phía client

## Tính năng chính

### 1. Trang chính (Public)
- **HomePage**
  - Giao diện trang chủ giới thiệu website
  - Banner (carousel) / hình ảnh nổi bật, khu vực gợi ý phòng / vị trí phổ biến
- **Tìm kiếm phòng**
  - Biểu mẫu chọn vị trí, ngày nhận/trả phòng, số lượng khách
  - Điều hướng sang trang danh sách phòng theo vị trí

### 2. Tài khoản & trải nghiệm người dùng
- **Đăng ký (Sign Up Page)**
  - Tạo tài khoản người dùng mới
  - Xác thực dữ liệu form (React Hook Form + Zod)
- **Đăng nhập (Sign In Page)**
  - Đăng nhập bằng tài khoản đã tạo
  - Lưu trữ token, tích hợp với Axios interceptor để tự động gắn token cho mọi request
- **Trang người dùng (User / Profile Page)**
  - Xem và cập nhật thông tin cá nhân
  - Xem các đặt phòng liên quan (tùy theo API cung cấp)
- **Đặt phòng**
  - Xem chi tiết phòng (Room Detail Page)
  - Chọn ngày, số lượng khách
  - Gửi yêu cầu đặt phòng tới API backend

### 3. Trải nghiệm & dịch vụ
- **ExperiencePage**
  - Liệt kê các trải nghiệm / hoạt động liên quan đến du lịch
- **ServicePage**
  - Hiển thị các dịch vụ đi kèm (tiện nghi, hỗ trợ, v.v.)

### 4. Danh sách & chi tiết phòng
- **RoomsByLocationPage**
  - Hiển thị danh sách phòng theo mã vị trí (`/rooms-by-location/:maViTri`)
- **RoomDetailPage**
  - Xem chi tiết phòng, hình ảnh, mô tả, tiện nghi
  - Tương tác đặt phòng từ giao diện chi tiết

### 5. Khu vực quản trị (Admin)
- **Đăng nhập admin (AdminSignInPage)**
  - Màn hình đăng nhập dành riêng cho admin
  - Hỗ trợ tài khoản admin demo cấu hình sẵn trong `APP_CONFIG`
- **Bảo vệ route admin (AdminRoute)**
  - Chỉ cho phép truy cập layout Admin khi đã đăng nhập với quyền hợp lệ
- **AdminLayout & các module quản lý**
  - **Quản lý người dùng (AdminUsersPage)**
    - Xem danh sách, thêm/sửa/xóa người dùng (tùy theo API hỗ trợ)
  - **Quản lý vị trí (AdminLocationsPage)**
    - Quản lý danh sách vị trí, phục vụ tìm kiếm và hiển thị phòng
  - **Quản lý phòng (AdminRoomsPage)**
    - Quản lý thông tin phòng, số lượng, trạng thái
  - **Quản lý đơn đặt phòng (AdminBookingsPage)**
    - Quản lý các booking, theo dõi lịch sử đặt phòng
- **Trang 404 (NotFoundPage)**
  - Hiển thị khi người dùng truy cập đường dẫn không tồn tại

---

## Công nghệ sử dụng

> Project hiện tại tập trung vào frontend (SPA) và tích hợp API backend do trung tâm cung cấp.

### Frontend
- React 19 + TypeScript
- Vite (dev server & build)
- React Router DOM 7 (định tuyến public/admin, nested routes, protected routes)
- Redux Toolkit + React Redux (quản lý state toàn cục)
- @tanstack/react-query (quản lý server state, cache API)
- Axios với instance dùng chung (`src/shared/services/api.ts`)
  - Tự gắn `BASE_URL`, `tokenCybersoft`, `Authorization: Bearer <access_token>`
- React Hook Form + Zod (xử lý và validate form)
- TailwindCSS 4 + Radix UI + Lucide React
  - Xây dựng UI hiện đại, responsive
- date-fns, Embla Carousel, sonner, react-icons, v.v.

### Backend (API tích hợp)
- Node.js / Express, MongoDB (API đặt phòng Airbnb clone do trung tâm cung cấp)
- Frontend trong repo này giao tiếp với backend thông qua HTTP APIs (Axios), không chứa mã nguồn backend

---

## Hướng dẫn cài đặt & chạy dự án

### 1. Yêu cầu hệ thống
- Node.js: phiên bản >= 18 (khuyến nghị LTS mới nhất)
- npm: đi kèm theo Node.js

### 2. Clone source code
```bash
git clone <URL-REPO-CUA-BAN>
cd project_capstone_airbnb-demo-01

## File checklist/phân công task:
https://docs.google.com/spreadsheets/d/12NfQFFGP-Ap1Zax6AC9LLMVIMaUGBs80xNAXfDNn20c/edit?usp=sharing
npm install
npm run dev
