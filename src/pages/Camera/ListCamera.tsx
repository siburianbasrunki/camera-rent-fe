import { useNavigate } from "react-router-dom";
import { CameraData } from "../../store/brand";
import { formatRupiah } from "../../helper/formatRupiah";

const CameraListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Kamera Tersedia</h1>
      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari kamera..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1  gap-6">
        {CameraData.map((camera) => (
          <div
            key={camera.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition "
          >
            <div className="flex gap-4 p-4">
              <img
                src={camera.image}
                alt={camera.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex flex-col ">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{camera.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formatRupiah(camera.price)} / hari
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/camera/${camera.id}`)}
                  className="mt-4 inline-block w-max bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Detail Kamera
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraListPage;
