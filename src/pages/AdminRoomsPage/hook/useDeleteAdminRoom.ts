import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsApi } from "../server";

export const useDeleteAdminRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => roomsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });
};
