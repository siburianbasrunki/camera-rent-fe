import type { User } from "../service/auth";
import type { Camera } from "./camera";

export type BookingStatus = "PENDING" | "PAID" | "CANCELLED" | "COMPLETED";
export type PaymentMethod = "BANK_TRANSFER" | "QRIS" | "CREDIT_CARD";
export type PaymentStatus = "PENDING" | "SETTLED" | "EXPIRED" | "FAILED";

export interface Booking {
  id: string;
  userId: string;
  cameraId: string;
  date: Date | string;
  startDate: Date | string;
  endDate: Date | string;
  duration: number;
  purpose: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  camera: Camera;
  payment?: Payment;
  user?: User;
}

export interface Payment {
  id: string;
  bookingId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  midtransOrderId?: string;
  paymentCode?: string;
  paymentUrl?: string;
  expiryTime?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}