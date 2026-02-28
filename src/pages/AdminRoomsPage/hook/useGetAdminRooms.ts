import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "../server";
import { getPaginatedData } from "@/utils/apiResponse";
import type { Room } from "../server";

export const useGetAdminRooms = (
    pageIndex: number,
    pageSize: number,
    keyword: string, // từ khóa tìm kiếm
) => {
    const { data } = useQuery({
        queryKey: ["admin-rooms", keyword, pageIndex],
        queryFn: () =>
            roomsApi.getPaginated(pageIndex, pageSize, keyword),
    });

    const { data: roomList, totalPage } = getPaginatedData<Room>(data);

    return { roomList, totalPage, isLoading: false };
};
