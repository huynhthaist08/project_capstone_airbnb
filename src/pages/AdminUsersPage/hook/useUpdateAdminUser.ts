import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "../server/user.type";
import USERS from "../server/users.api";

type UpdateUserPayload = {
    id: number;
    data: Partial<User>;
};

export const useUpdateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateUserPayload) => {
            console.log("[UPDATE] Starting update user mutation...");
            console.log("[UPDATE] User ID:", payload.id);
            console.log("[UPDATE] Payload:", payload.data);
            try {
                const response = await USERS.update(payload.id, payload.data);
                console.log("[UPDATE] API Response:", response);
                return response;
            } catch (error) {
                console.error("[UPDATE] API Error:", error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log("[UPDATE SUCCESS] Mutation completed successfully");
            console.log("[UPDATE SUCCESS] Response data:", data);
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
            console.log("[UPDATE SUCCESS] Cache invalidated");
            toast.success("Cập nhật quản trị viên thành công!");
        },
        onError: (error) => {
            console.error("[UPDATE ERROR] Mutation failed:", error);
            console.error("[UPDATE ERROR] Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
            toast.error("Cập nhật quản trị viên thất bại. Vui lòng thử lại!");
        },
    });
};
