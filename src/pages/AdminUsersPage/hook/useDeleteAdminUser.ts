import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import USERS from "../server/users.api";

export const useDeleteAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            console.log("[DELETE] Starting delete user mutation...");
            console.log("[DELETE] User ID:", id);
            try {
                const response = await USERS.delete(id);
                console.log("[DELETE] API Response:", response);
                return response;
            } catch (error) {
                console.error("[DELETE] API Error:", error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log("[DELETE SUCCESS] Mutation completed successfully");
            console.log("[DELETE SUCCESS] Response data:", data);
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
            console.log("[DELETE SUCCESS] Cache invalidated");
            toast.success("Xóa quản trị viên thành công!");
        },
        onError: (error) => {
            console.error("[DELETE ERROR] Mutation failed:", error);
            console.error("[DELETE ERROR] Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
            toast.error("Xóa quản trị viên thất bại. Vui lòng thử lại!");
        },
    });
};
