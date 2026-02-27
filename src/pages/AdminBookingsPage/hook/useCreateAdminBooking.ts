import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi, type BookingFormData } from "../server";

export const useCreateAdminBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BookingFormData) => bookingsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });
};
