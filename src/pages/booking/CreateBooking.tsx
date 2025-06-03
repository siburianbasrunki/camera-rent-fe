import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaMoneyBillWave,
  FaQrcode,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateBooking } from "../../hook/booking";

export const CreateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const camera = location.state?.camera;
  const { mutate: createBooking, isPending } = useCreateBooking();

  const [bookingData, setBookingData] = useState({
    cameraId: camera?.id || "",
    date: "",
    time: "",
    duration: 1,
    purpose: "",
    paymentMethod: "BANK_TRANSFER",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const dateTime = new Date(`${bookingData.date}T${bookingData.time}:00`);

    createBooking(
      {
        cameraId: bookingData.cameraId,
        date: dateTime.toISOString(),
        duration: bookingData.duration,
        purpose: bookingData.purpose,
        paymentMethod: bookingData.paymentMethod as "BANK_TRANSFER" | "QRIS",
      },
      {
        onSuccess: () => {
          navigate("/booking");
        },
      }
    );
  };

  useEffect(() => {
    if (!camera) {
      navigate("/cameras");
    }
  }, [camera, navigate]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/cameras" className="mr-4">
            <FaArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-2xl font-bold">Buat Booking Baru</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipe Kamera
            </label>
            <input
              type="text"
              name="cameraType"
              value={camera?.name || ""}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-indigo-500"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Waktu</label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <FaClock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Durasi (hari) 
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              max="30"
              value={bookingData.duration}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tujuan Pemakaian
            </label>
            <textarea
              name="purpose"
              value={bookingData.purpose}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
              placeholder="Contoh: Pemotretan produk, Wedding, dll."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Metode Pembayaran
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="BANK_TRANSFER"
                  checked={bookingData.paymentMethod === "BANK_TRANSFER"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <FaMoneyBillWave className="mr-2 text-blue-500" />
                <span>Bank Transfer</span>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="QRIS"
                  checked={bookingData.paymentMethod === "QRIS"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <FaQrcode className="mr-2 text-green-500" />
                <span>QRIS</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:bg-indigo-300"
          >
            {isPending ? "Memproses..." : "Buat Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};
