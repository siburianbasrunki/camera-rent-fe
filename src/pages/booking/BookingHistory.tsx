import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const bookingHistory = [
  {
    id: 1,
    cameraType: "Canon EOS R5",
    date: "2023-06-15",
    time: "10:00",
    duration: 2,
    purpose: "Foto produk e-commerce",
    status: "completed",
    price: "Rp 250.000",
  },
  {
    id: 2,
    cameraType: "Sony A7 III",
    date: "2023-06-20",
    time: "14:00",
    duration: 3,
    purpose: "Pemotretan pre-wedding",
    status: "upcoming",
    price: "Rp 375.000",
  },
  {
    id: 3,
    cameraType: "Fujifilm X-T4",
    date: "2023-05-28",
    time: "09:00",
    duration: 1,
    purpose: "Foto jalan-jalan",
    status: "cancelled",
    price: "Rp 125.000",
  },
];

export const BookingHistory = () => {
  // const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="mr-4">
            <FaArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-2xl font-bold">Riwayat Booking</h1>
          <div className="w-6"></div>
        </div>

        <div className="space-y-4">
          {bookingHistory.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Belum ada riwayat booking</p>
              <Link
                to="/booking/create"
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Buat booking pertama Anda
              </Link>
            </div>
          ) : (
            bookingHistory.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{booking.cameraType}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status === "completed"
                      ? "Selesai"
                      : booking.status === "upcoming"
                      ? "Akan datang"
                      : "Dibatalkan"}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <FaCalendarAlt className="mr-2 flex-shrink-0" />
                  <span>
                    {new Date(booking.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <FaClock className="mr-2 flex-shrink-0" />
                  <span>
                    {booking.time} - {parseInt(booking.time) + booking.duration}
                    :00 ({booking.duration} jam)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <FaMoneyBillWave className="mr-2 flex-shrink-0" />
                  <span className="font-medium">{booking.price}</span>
                </div>

                <p className="text-sm text-gray-700 mb-4">{booking.purpose}</p>

                <div className="flex space-x-2">
                  {booking.status === "upcoming" && (
                    <>
                      <button className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded hover:bg-indigo-200">
                        Edit
                      </button>
                      <button className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">
                        Batalkan
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 flex items-center">
                      <FaCheckCircle className="mr-1" /> Beri Rating
                    </button>
                  )}
                  {booking.status === "cancelled" && (
                    <button className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200 flex items-center">
                      <FaTimesCircle className="mr-1" /> Booking Lagi
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
