import { useState } from "react";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CreateBooking = () => {
  const [bookingData, setBookingData] = useState({
    cameraType: '',
    date: '',
    time: '',
    duration: 1,
    purpose: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit logic here
    console.log('Booking data:', bookingData);
    // Redirect to history after submit
    window.location.href = '/booking/history';
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/booking" className="mr-4">
            <FaArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-2xl font-bold">Buat Booking Baru</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipe Kamera</label>
            <select
              name="cameraType"
              value={bookingData.cameraType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Pilih Kamera</option>
              <option value="Canon EOS R5">Canon EOS R5</option>
              <option value="Sony A7 III">Sony A7 III</option>
              <option value="Fujifilm X-T4">Fujifilm X-T4</option>
            </select>
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
            <label className="block text-sm font-medium mb-1">Durasi (jam)</label>
            <input
              type="number"
              name="duration"
              min="1"
              max="8"
              value={bookingData.duration}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tujuan Pemakaian</label>
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
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Buat Booking
          </button>
        </form>
      </div>
    </div>
  );
};