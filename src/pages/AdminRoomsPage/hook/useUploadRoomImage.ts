import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsApi } from "../server";

export const useUploadRoomImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: number; file: File }) =>
            roomsApi.uploadImage(payload.id, payload.file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });
};
