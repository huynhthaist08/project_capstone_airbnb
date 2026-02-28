import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import USERS from "../server/users.api";

type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: string;
};

export const useCreateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateUserPayload) => {
            console.log("[CREATE] Starting create user mutation...");
            console.log("[CREATE] Payload:", payload);
            try {
                const response = await USERS.create(payload);
                console.log("[CREATE] API Response:", response);
                return response;
            } catch (error) {
                console.error("[CREATE] API Error:", error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log("[CREATE SUCCESS] Mutation completed successfully");
            console.log("[CREATE SUCCESS] Response data:", data);
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
            console.log("[CREATE SUCCESS] Cache invalidated");
            toast.success("Thêm quản trị viên thành công!");
        },
        onError: (error) => {
            console.error("[CREATE ERROR] Mutation failed:", error);
            console.error("[CREATE ERROR] Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
            toast.error("Thêm quản trị viên thất bại. Vui lòng thử lại!");
        },
    });
};
