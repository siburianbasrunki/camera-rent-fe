import { useQuery } from "@tanstack/react-query";
import UserService from "../service/user";
import { useAuth } from "../context/AuthContext";

export const useUserById = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cameras", user?.id],
    queryFn: () => {
      if (!user) throw new Error("No ID provided");
      return UserService.getUserById(user.id);
    },
    enabled: !!user,
  });
};
