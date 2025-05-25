import { FaArrowRight } from "react-icons/fa";
import { useBrand } from "../../hook/brand";
import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";

export const BrandSection = () => {
  const { data: brands, isLoading, isError, error } = useBrand();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <>
      <div className="p-2 ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">Browse by brands</p>
          <FaArrowRight className="w-10 h-5 text-gray-600" />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4 ">
            {brands?.map((brand) => (
              <div
                key={brand.id}
                className="bg-gradient-to-t from-white/80 to-transparent rounded-xl p-4 flex flex-col items-center shadow-md hover:scale-[1.02] transition-transform duration-200 border border-gray-300"
              >
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="w-20 h-20 rounded-md"
                />
                <p className="text-sm font-semibold text-black">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};