import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi, type BookingFormData } from "../server";

export const useUpdateAdminBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: number; data: Partial<BookingFormData> }) =>
            bookingsApi.update(payload.id, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });
};
