// component chính của trang profile, hiển thị thông tin user, các thẻ xác thực và danh sách phòng đã đặt
import { useProfileData, useUpdateProfile } from "../hooks";
import { UserInfoCard, VerificationCards, BookedRoomsList } from "./index";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const { profile, bookings, isLoading } = useProfileData();
  const updateProfile = useUpdateProfile();
  
  if (!authUser) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="text-yellow-700 font-semibold">⚠️ Chưa đăng nhập</h3>
        <p className="text-yellow-600 text-sm">Vui lòng đăng nhập để xem thông tin profile</p>
      </div>
    );
  }
  
  if (isLoading) return <div className="p-4">Loading...</div>;
  
  if (!profile) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-red-700 font-semibold">Lỗi: Không thể tải dữ liệu profile</h3>
        <p className="text-red-600 text-sm">Kiểm tra Console để xem chi tiết lỗi</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Info Card (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <UserInfoCard 
              profile={profile} 
              onUpdate={updateProfile.mutateAsync} 
            />
            <VerificationCards profile={profile} />
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Xin chào, tôi là {profile.name}
            </h1>
            <p className="text-gray-600">
              Bắt đầu tham gia vào {new Date(profile.birthday).getFullYear()}
            </p>
          </div>

          {/* Booked Rooms List */}
          <BookedRoomsList bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
