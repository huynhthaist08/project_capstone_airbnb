import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "../server";

export const useDeleteAdminBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => bookingsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });
};
