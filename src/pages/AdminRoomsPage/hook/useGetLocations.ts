import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "../server";
import type { Location } from "@/types/location.type";
import { useMemo } from "react";

export const useGetLocations = () => {
    const { data: locationsRes } = useQuery({
        queryKey: ["admin-room-locations"],
        queryFn: () => roomsApi.getAllLocations(),
    });

    const locationOptions = useMemo(
        () =>
            ((locationsRes?.data?.content ?? []) as Location[]).map((loc) => ({
                id: loc.id,
                label: `${loc.tenViTri ?? ""}${
                    loc.tinhThanh ? `, ${loc.tinhThanh}` : ""
                }`,
            })),
        [locationsRes],
    );

    return { locationOptions };
};