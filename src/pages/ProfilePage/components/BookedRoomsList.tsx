// danh sách các phòng đã đặt
import { useQuery } from "@tanstack/react-query";
import type { Booking } from "../servers/profile.type";
import PHONG_THUE from "@/api/phong-thue";
import type { Room } from "@/types/room.type";
import { Heart } from "lucide-react";

interface Props {
  bookings: Booking[];
}

export const BookedRoomsList = ({ bookings }: Props) => {
  // Fetch room details for all bookings
  const roomQueries = useQuery({
    queryKey: ["booked-rooms", bookings?.map(b => b.maPhong)],
    queryFn: async () => {
      if (!bookings || bookings.length === 0) return [];
      
      const roomPromises = bookings.map(async (booking) => {
        try {
          const res = await PHONG_THUE.getById(booking.maPhong);
          return {
            booking,
            room: res.data.content,
          };
        } catch (error) {
          console.error(`Error fetching room ${booking.maPhong}:`, error);
          return null;
        }
      });

      const results = await Promise.all(roomPromises);
      return results.filter((r): r is { booking: Booking; room: Room } => r !== null);
    },
    enabled: !!bookings && bookings.length > 0,
  });

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white text-black rounded-2xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Phòng đã thuê</h2>
        <p className="text-gray-500">Bạn chưa đặt phòng nào</p>
      </div>
    );
  }

  if (roomQueries.isLoading) {
    return (
      <div className="bg-white text-black rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Phòng đã thuê</h2>
        <p className="text-gray-500">Đang tải danh sách phòng...</p>
      </div>
    );
  }

  const bookedRooms = roomQueries.data || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Phòng đã thuê</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookedRooms.map(({ booking, room }) => (
          <div
            key={booking.id}
            // Card phòng đã thuê: khóa nền trắng + chữ tối để tránh mất chữ trong dark mode.
            className="bg-white text-black rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
          >
            {/* Room Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={room.hinhAnh}
                alt={room.tenPhong}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite toggle
                }}
              >
                <Heart className="w-4 h-4 text-gray-600 hover:fill-red-500 hover:text-red-500" />
              </button>
            </div>

            {/* Room Details */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-1">
                Toàn bộ căn hộ dịch vụ tại {room.moTa?.split(" ").slice(0, 3).join(" ")}
              </p>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {room.tenPhong}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>{room.khach} khách</span>
                <span>•</span>
                <span>{room.phongNgu} phòng ngủ</span>
                <span>•</span>
                <span>{room.giuong} giường</span>
                <span>•</span>
                <span>{room.phongTam} phòng tắm</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {room.wifi && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Wifi</span>
                )}
                {room.bep && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Bếp</span>
                )}
                {room.dieuHoa && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Điều hòa</span>
                )}
                {room.mayGiat && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Máy giặt</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.ngayDen).toLocaleDateString("vi-VN")} - {new Date(booking.ngayDi).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${room.giaTien}
                    <span className="text-sm font-normal text-gray-600"> / đêm</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};
