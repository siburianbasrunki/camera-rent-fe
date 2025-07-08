import {  useState } from "react";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaMoneyBillWave,
  FaQrcode,
  FaIdCard,
  FaSpinner,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateBooking } from "../../hook/booking";
import { useCameraById } from "../../hook/camera";

export const CreateBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const camera = location.state?.camera;
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { data: cameraDetail, isLoading } = useCameraById();

  const [bookingData, setBookingData] = useState({
    cameraId: cameraDetail?.id || "",
    startDate: "",
    endDate: "",
    purpose: "",
    paymentMethod: "BANK_TRANSFER",
  });
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdentityFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!identityFile) {
      alert("Please upload your identity proof");
      return;
    }

    const formData = new FormData();
    formData.append("cameraId", bookingData.cameraId);
    formData.append("startDate", bookingData.startDate);
    formData.append("endDate", bookingData.endDate);
    formData.append("purpose", bookingData.purpose);
    formData.append("paymentMethod", bookingData.paymentMethod);
    formData.append("identityProof", identityFile);

    createBooking(formData, {
      onSuccess: () => {
        navigate("/booking");
      },
    });
  };

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-indigo-600" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/camera" className="mr-4">
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
              value={cameraDetail?.name || ""}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tanggal Mulai
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-indigo-500"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tanggal Selesai
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  value={bookingData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg pl-10 focus:ring-2 focus:ring-indigo-500"
                  required
                  min={
                    bookingData.startDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
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
              Upload Identitas (KTP/SIM)
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {previewUrl ? (
                <div className="mb-2">
                  <img
                    src={previewUrl}
                    alt="Identity preview"
                    className="max-h-40 mx-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIdentityFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <FaIdCard className="text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Klik untuk mengunggah foto KTP/SIM
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>
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
