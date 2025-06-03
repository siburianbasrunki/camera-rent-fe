import { getEndpoints } from "../config/config";
import type { Booking, PaymentMethod } from "../model/booking";

interface CreateBookingData {
  cameraId: string;
  date: string;
  duration: number;
  purpose: string;
  paymentMethod: PaymentMethod;
}

const BookingService = {
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const { booking } = getEndpoints();
    const res = await fetch(booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async getUserBookings(): Promise<Booking[]> {
    const { booking } = getEndpoints();
    const res = await fetch(booking, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async checkPaymentStatus(bookingId: string): Promise<any> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${bookingId}/payment-status`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${bookingId}/cancel`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default BookingService;