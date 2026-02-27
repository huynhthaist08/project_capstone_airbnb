import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "../server";
import { getContentArray } from "@/utils/apiResponse";
import type { Booking } from "../server";
import { useMemo } from "react";

export const useGetAdminBookings = (pageIndex: number, pageSize: number) => {
    const { data } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: () => bookingsApi.getAll(),
    });

    const bookingList = getContentArray<Booking>(data);

    const { currentPageItems, totalPage } = useMemo(() => {
        const totalPage = Math.ceil(bookingList.length / pageSize) || 1;
        const safePage = Math.min(Math.max(1, pageIndex), totalPage);
        const start = (safePage - 1) * pageSize;
        const items = bookingList.slice(start, start + pageSize);
        return { currentPageItems: items, totalPage };
    }, [bookingList, pageIndex, pageSize]);

    return { bookingList: currentPageItems, totalPage, isLoading: false };
};
