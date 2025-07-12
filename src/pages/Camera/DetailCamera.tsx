import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { useCameraById, useCameraReviews } from "../../hook/camera";
import { EmptyState } from "../../components/EmptyState";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CameraDetail = () => {
  const { data: camera, isLoading, isError, error } = useCameraById();
  const { data: reviews, isLoading: reviewsLoading } = useCameraReviews();
  const navigate = useNavigate();

  const allImages = [
    {
      id: "main-image",
      imageUrl: camera?.imageUrl,
      isMain: true,
    },
    ...(camera?.cameraPhoto?.map((photo) => ({
      id: photo.id,
      imageUrl: photo.imageUrl,
      isMain: false,
    })) || []),
  ];

  console.log("allImages:", allImages);

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-indigo-600" />
      </div>
    );
  }

  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen">
      <button
        onClick={() => navigate("/booking")}
        className="flex items-center text-indigo-600 mb-4 cursor-pointer"
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </button>

      <div className="mb-4 rounded-xl overflow-hidden">
        <Slider {...settings}>
          {allImages.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.imageUrl}
                alt={camera?.name}
                className="w-full h-64 object-cover"
              />
              {image.isMain && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Main Image
                </span>
              )}
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-2xl font-bold text-gray-800">{camera?.name}</h1>
      <p className="text-gray-600 mt-2">
        {formatRupiah(camera?.price || 0)} / day
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gray-800">Ciri-ciri:</h2>
      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
        {camera?.ciri_ciri.map((item, index) => (
          <li key={index}>{item.ciri}</li>
        ))}
      </ul>

      <button
        onClick={() =>
          navigate(`/booking/${camera?.id}`, { state: { camera } })
        }
        className="mt-4 inline-block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
      >
        Booking
      </button>

      <div className="mt-8 mb-[80px] ">
        <h2 className="text-xl font-semibold mb-4">Ulasan Pengguna</h2>

        {reviewsLoading ? (
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-xl text-indigo-600" />
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={review.user.imageUrl || "/default-avatar.png"}
                    alt={review.user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-medium">{review.user.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(review.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada ulasan untuk kamera ini.</p>
        )}
      </div>
    </div>
  );
};

export default CameraDetail;
