import { useQuery } from "@tanstack/react-query";
import USERS from "../server/users.api";

type useGetAdminUsersParams = {
    pageIndex: number;
    pageSize: number;
    keyword?: string;
};

export const useGetAdminUsers = ({
    pageIndex,
    pageSize,
    keyword,
}: useGetAdminUsersParams) => {
    return useQuery({
        queryKey: ["admin-users", keyword, pageIndex],
        queryFn: async () => {
            console.log("[GET] Fetching admin users...");
            console.log("[GET] Params:", { pageIndex, pageSize, keyword });
            try {
                const response = await USERS.getPaginated({
                    pageIndex,
                    pageSize,
                    keyword: keyword || undefined,
                });
                console.log("[GET] API Response:", response);
                return response;
            } catch (error) {
                console.error("[GET] API Error:", error);
                throw error;
            }
        },
    });
};
