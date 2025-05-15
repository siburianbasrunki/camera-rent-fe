import { Routes, Route } from "react-router-dom";
import { CreateBooking } from "./CreateBooking";
import { BookingHistory } from "./BookingHistory";

export const BookingPage = () => {
  return (
    <Routes>
      <Route path="create" element={<CreateBooking />} />
      <Route path="history" element={<BookingHistory />} />
      
      <Route index element={<BookingHistory />} />
    </Routes>
  );
};