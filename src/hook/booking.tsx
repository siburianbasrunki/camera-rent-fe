import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import BookingService from "../service/booking";
import { useNavigate } from "react-router-dom";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BookingService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUserBookings = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => BookingService.getUserBookings(),
    enabled: !!user?.id,
  });
};

export const useBookingById = (id: string) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => BookingService.getBookingById(id),
    enabled: !!id,
  });
};

export const useCheckPaymentStatus = () => {
  return useMutation({
    mutationFn: BookingService.checkPaymentStatus,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BookingService.cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useProcessReturn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ bookingId, formData }: { bookingId: string, formData: FormData }) => 
      BookingService.processReturn(bookingId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate("/booking");
    },
  });
};