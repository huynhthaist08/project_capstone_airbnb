import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsApi, type RoomFormData } from "../server";

export const useCreateAdminRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RoomFormData) => roomsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });
};
