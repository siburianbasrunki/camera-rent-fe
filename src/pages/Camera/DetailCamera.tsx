import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { useCameraById } from "../../hook/camera";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";

const CameraDetail = () => {
 const { data: camera, isLoading, isError, error } = useCameraById();

  const navigate = useNavigate();
  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;


  return (
    <div className="p-4 max-w-md mx-auto min-h-screen">
      <img
        src={camera?.imageUrl}
        alt={camera?.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-800">{camera?.name}</h1>
      <p className="text-gray-600 mt-2">{formatRupiah(camera?.price || 0)} / day</p>
      <h2 className="mt-6 text-xl font-semibold text-gray-800">Ciri-ciri:</h2>
      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
        {camera?.ciri_ciri.map((item, index) => (
          <li key={index}>{item.ciri}</li>
        ))}
      </ul>
      <button
        onClick={() => navigate(`/booking/${camera?.id}`, { state: { camera } })}
        className="mt-4 inline-block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
      >
        Booking
      </button>
    </div>
  );
};

export default CameraDetail;
