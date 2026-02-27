import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "../server";
import { getContentArray } from "@/utils/apiResponse";
import type { Booking } from "../server";

export const useGetBookingsByRoom = (roomId: number | null) => {
    const { data } = useQuery({
        queryKey: ["admin-bookings-by-room", roomId],
        queryFn: () => bookingsApi.getAll(),
        enabled: !!roomId,
    });

    const allBookings = getContentArray<Booking>(data);
    
    // Lọc bookings của phòng cụ thể
    const roomBookings = roomId 
        ? allBookings.filter((b) => b.maPhong === roomId)
        : [];

    return { roomBookings, allBookings };
};
