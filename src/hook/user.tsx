import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: FormData) => {
      if (!user?.id) throw new Error("No user ID");
      return UserService.updateUser(user.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cameras", user?.id] });
    },
  });
};