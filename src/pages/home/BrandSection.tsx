import { useBrand } from "../../hook/brand";
import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const BrandSection = () => {
 const sliderSettings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    dots: false,
    centerMode: false,
    variableWidth: false,
    
  };

  const { data: brands, isLoading, isError, error } = useBrand();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-semibold">Browse by brands</p>
      </div>
      <div className="slider-container">
        <Slider {...sliderSettings} className="px-2 md:px-4">
          {brands?.map((brand) => (
            <div
              key={brand.id}
              className="bg-gradient-to-t from-white/80 to-transparent rounded-xl p-4 flex flex-col items-center shadow-md hover:scale-[1.02] transition-transform duration-200 border border-gray-300 mx-10" 
            >
              <img
                src={brand.imageUrl}
                alt={brand.name}
                className="w-20 h-20 rounded-md object-contain"
              />
              <p className="text-sm font-semibold text-black mt-3">
                {brand.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
