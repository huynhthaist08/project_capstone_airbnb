import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import PROFILE_API from "@/pages/ProfilePage/servers/profile.api";
import type {
  UserProfile,
  Booking,
} from "@/pages/ProfilePage/servers/profile.type";

export const useProfileData = () => {
  const { user, isReady } = useAuth(); // bt user id

  const prorileQuery = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("No user id");
      const res = await PROFILE_API.getUserProfile(user.id);
      console.log("Profile API Response:", res.data);
      return res.data?.content;
    },
    enabled: !!user?.id && isReady,
  });

  const bookingsQuery = useQuery({
    queryKey: ["user-bookings", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await PROFILE_API.getUserBookings(user.id);
      return res.data.content ?? [];
    },
    enabled: !!user?.id && isReady,
  });

  console.log("Profile Data State:", {
    userId: user?.id,
    isReady,
    profileData: prorileQuery.data,
    profileLoading: prorileQuery.isLoading,
    profileError: prorileQuery.error,
    bookingsData: bookingsQuery.data,
  });

  return {
    profile :prorileQuery.data as UserProfile,
    bookings: bookingsQuery.data as Booking[],
    isLoading: prorileQuery.isLoading || bookingsQuery.isLoading || !isReady,
  }
};
