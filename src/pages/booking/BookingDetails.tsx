import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaQrcode,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  useBookingById,
  useCancelBooking,
  useCheckPaymentStatus,
} from "../../hook/booking";
import { useConfirmation } from "../../components/PopUp";

export const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBookingById(id || "");
  const { mutate: checkPayment, isPending: isCheckingPayment } =
    useCheckPaymentStatus();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const {showConfirmation} = useConfirmation();
  useEffect(() => {
    if (booking?.payment?.status === "PENDING" && !paymentStatus) {
      const interval = setInterval(() => {
        checkPayment(booking.id, {
          onSuccess: (data) => {
            setPaymentStatus(data.paymentStatus);
            if (data.paymentStatus.transaction_status === "settlement") {
              clearInterval(interval);
            }
          },
        });
      }, 30000); 

      return () => clearInterval(interval);
    }
  }, [booking, checkPayment, paymentStatus]);

  const handleCheckPayment = () => {
    if (!booking) return;
    checkPayment(booking.id, {
      onSuccess: (data) => {
        setPaymentStatus(data.paymentStatus);
      },
    });
  };

   const handleCancelBooking = () => {
    if (!booking) return;
    
    showConfirmation("Apakah Anda yakin ingin membatalkan booking ini?", () => {
      cancelBooking(booking.id, {
        onSuccess: () => {
          navigate("/booking");
        },
      });
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-indigo-600" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <p>Booking tidak ditemukan</p>
      </div>
    );
  }

  const currentStatus =
    paymentStatus?.transaction_status || booking.payment?.status;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center text-indigo-600 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold mb-6">Detail Booking</h1>

        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-medium text-xl">{booking.camera.name}</h2>
              <div className="flex items-center mt-2 text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex items-center mt-1 text-gray-500">
                <FaClock className="mr-2" />
                <span>
                  {new Date(booking.date).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                Rp{booking.totalPrice.toLocaleString()}
              </div>
              <div className="mt-2">
                {currentStatus === "PENDING" && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Menunggu Pembayaran
                  </span>
                )}
                {currentStatus === "settlement" && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Dibayar
                  </span>
                )}
                {currentStatus === "expired" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    Kadaluarsa
                  </span>
                )}
                {booking.status === "CANCELLED" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    Dibatalkan
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Tujuan Pemakaian</h3>
            <p className="text-gray-700">{booking.purpose}</p>
          </div>

          {booking.payment && (
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Detail Pembayaran</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    {booking.payment.paymentMethod === "BANK_TRANSFER" ? (
                      <FaMoneyBillWave className="text-blue-500 mr-2" />
                    ) : (
                      <FaQrcode className="text-green-500 mr-2" />
                    )}
                    <span>
                      {booking.payment.paymentMethod === "BANK_TRANSFER"
                        ? "Bank Transfer"
                        : "QRIS"}
                    </span>
                  </div>

                  {booking.payment.paymentMethod === "BANK_TRANSFER" && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">
                        Nomor Virtual Account
                      </h4>
                      <div className="bg-gray-100 p-3 rounded-lg font-mono text-lg">
                        {booking.payment.paymentCode}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Gunakan nomor ini untuk melakukan pembayaran melalui
                        ATM/mobile banking
                      </p>
                    </div>
                  )}

                  {booking.payment.paymentMethod === "QRIS" && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">QR Code Pembayaran</h4>
                      <div className="bg-white p-4 rounded-lg border flex justify-center">
                        <QRCode
                          value={booking.payment.paymentCode || ""}
                          size={180}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Scan QR code ini menggunakan aplikasi mobile banking
                        Anda
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Pembayaran</span>
                      <span className="font-medium">
                        Rp{booking.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Metode Pembayaran</span>
                      <span>
                        {booking.payment.paymentMethod === "BANK_TRANSFER"
                          ? "Bank Transfer"
                          : "QRIS"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status Pembayaran</span>
                      <span>
                        {currentStatus === "PENDING" && "Menunggu Pembayaran"}
                        {currentStatus === "settlement" && "Berhasil"}
                        {currentStatus === "expired" && "Kadaluarsa"}
                      </span>
                    </div>
                    {booking.payment.expiryTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Batas Waktu Pembayaran
                        </span>
                        <span>
                          {new Date(
                            booking.payment.expiryTime
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {currentStatus === "PENDING" && (
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleCheckPayment}
                        disabled={isCheckingPayment}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium disabled:bg-indigo-300 flex items-center justify-center"
                      >
                        {isCheckingPayment ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Memeriksa...
                          </>
                        ) : (
                          "Periksa Status Pembayaran"
                        )}
                      </button>
                      <button
                        onClick={handleCancelBooking}
                        disabled={isCancelling}
                        className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition font-medium disabled:bg-red-50 flex items-center justify-center"
                      >
                        {isCancelling ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Membatalkan...
                          </>
                        ) : (
                          "Batalkan Booking"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};