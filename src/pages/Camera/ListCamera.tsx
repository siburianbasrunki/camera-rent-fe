import { useNavigate, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";
import { useCamera } from "../../hook/camera";
import { useState } from "react";
import { useDebounce } from "../../hook/debunce";
import { FaSpinner } from "react-icons/fa";

const CameraListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: cameras,
    isLoading,
    isError,
    error,
  } = useCamera(debouncedSearchTerm);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-indigo-600" />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Daftar Kamera Tersedia
        </h1>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Cari kamera..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            </div>
          )}
        </div>

        {debouncedSearchTerm && (
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan hasil untuk: "{debouncedSearchTerm}"
          </p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {isLoading && !cameras ? (
            <CardSkeleton />
          ) : isError ? (
            <EmptyState title={error.message} />
          ) : cameras?.length === 0 ? (
            <EmptyState
              title={
                debouncedSearchTerm
                  ? `Tidak ditemukan kamera dengan kata kunci "${debouncedSearchTerm}"`
                  : "Tidak ada kamera tersedia"
              }
            />
          ) : (
            cameras?.map((camera) => (
              <div
                key={camera.id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={camera.imageUrl}
                    alt={camera.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800">
                      {camera.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {formatRupiah(camera.price)} / hari
                    </p>
                    <button
                      onClick={() => navigate(`/camera/${camera.id}`)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-fit"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="mb-[80px]"></div>
        </div>
      </div>
    </div>
  );
};

export default CameraListPage;
