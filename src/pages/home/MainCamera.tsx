import { FaArrowRight } from "react-icons/fa";
import { formatRupiah } from "../../helper/formatRupiah";
import { CameraData } from "../../store/brand";
import { useNavigate } from "react-router-dom";

export const CameraSection = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold text-gray-800">List Camera</p>
        <FaArrowRight className="w-5 h-5 text-gray-600" />
      </div>

      <div className="grid grid-cols-1  gap-6">
        {CameraData.map((camera) => (
          <div
            key={camera.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 border border-gray-200 flex flex-col"
          >
            <div className="flex justify-center items-center p-4">
              <img
                src={camera.image}
                alt={camera.name}
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>

            <div className="px-4 pb-4 flex flex-col gap-2">
              <p className="text-lg font-semibold text-gray-800">
                {camera.name}
              </p>
              <p className="text-gray-600">
                {formatRupiah(camera.price)} / day
              </p>

              <button
                className="mt-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md hover:from-indigo-700 hover:to-blue-700 transition"
                onClick={() => navigate(`/camera/${camera.id}`)}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
