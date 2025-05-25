import { useNavigate, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";
import { useCamera } from "../../hook/camera";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hook/debunce";

const CameraListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const debouncedSearchTerm = useDebounce(searchTerm, 500); 
  const { data: cameras, isLoading, isError, error } = useCamera(debouncedSearchTerm);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ search: debouncedSearchTerm });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchTerm, setSearchParams]);

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Daftar Kamera Tersedia
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari kamera..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {cameras?.length === 0 ? (
          <EmptyState title="Tidak ada kamera ditemukan" />
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
                  <h3 className="text-lg font-bold text-gray-800">{camera.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formatRupiah(camera.price)} / hari
                  </p>
                  <button
                    onClick={() => navigate(`/camera/${camera.id}`)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Detail 
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CameraListPage;
