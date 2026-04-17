import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import PROFILE_API from "@/pages/ProfilePage/servers/profile.api";
import type { UpdateUserProfileBody } from "@/pages/ProfilePage/servers/profile.type";
export const useUpdateProfile = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserProfileBody) => {
            if (!user?.id) throw new Error("No user id");
            return PROFILE_API.updateUserProfile(user.id, data);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-profile", user?.id],
            });
        },
    });
};
