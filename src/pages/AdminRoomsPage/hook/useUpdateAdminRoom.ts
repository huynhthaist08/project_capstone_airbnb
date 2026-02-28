import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsApi, type Room } from "../server";

export const useUpdateAdminRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: number; data: Partial<Room> }) =>
            roomsApi.update(payload.id, payload.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });
};
