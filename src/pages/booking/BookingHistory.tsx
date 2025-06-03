import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaQrcode,
  FaSpinner,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserBookings } from "../../hook/booking";
import { formatDate, formatTimeRange } from "../../helper/date";

export const BookingHistory = () => {
  const { data: bookings, isLoading } = useUserBookings();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-indigo-600" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
            Pending
          </span>
        );
      case "PAID":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            Paid
          </span>
        );
      case "CANCELLED":
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
            Cancelled
          </span>
        );
      case "COMPLETED":
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            Completed
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "BANK_TRANSFER":
        return <FaMoneyBillWave className="text-blue-500" />;
      case "QRIS":
        return <FaQrcode className="text-green-500" />;
      default:
        return <FaMoneyBillWave className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Riwayat Booking</h1>

        {bookings?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Anda belum memiliki booking</p>
            <Link
              to="/cameras"
              className="text-indigo-600 hover:underline mt-2 inline-block"
            >
              Booking kamera sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings?.map((booking) => (
              <Link
                to={`/booking/detail/${booking.id}`}
                key={booking.id}
                className="block border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-medium text-lg">{booking.camera.name}</h2>
                    <div className="flex items-center mt-1 text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(booking.date  as string)}</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500">
                      <FaClock className="mr-2" />
                      <span>
                        {formatTimeRange(booking.date as string, booking.duration)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      Rp{booking.totalPrice.toLocaleString("id-ID")}
                    </div>
                    <div className="mt-2">{getStatusBadge(booking.status)}</div>
                  </div>
                </div>

                {booking.payment && (
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <div className="flex items-center">
                      {getPaymentMethodIcon(booking.payment.paymentMethod)}
                      <span className="ml-2">
                        {booking.payment.paymentMethod === "BANK_TRANSFER"
                          ? "Bank Transfer"
                          : "QRIS"}
                      </span>
                    </div>
                    <div>
                      {booking.payment.status === "PENDING" && (
                        <span className="text-yellow-600 flex items-center">
                          <FaSpinner className="animate-spin mr-1" /> Menunggu pembayaran
                        </span>
                      )}
                      {booking.payment.status === "SETTLED" && (
                        <span className="text-green-600 flex items-center">
                          <FaCheck className="mr-1" /> Dibayar
                        </span>
                      )}
                      {booking.payment.status === "EXPIRED" && (
                        <span className="text-red-600 flex items-center">
                          <FaTimes className="mr-1" /> Kadaluarsa
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
