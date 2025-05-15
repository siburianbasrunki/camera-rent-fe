import { FaArrowRight } from "react-icons/fa";
import { BrandData } from "../../store/brand";
export const BrandSection = () => {
  return (
    <>
      <div className="p-2 ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">Browse by brands</p>
          <FaArrowRight className="w-10 h-5 text-gray-600" />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4 ">
            {BrandData.map((brand) => (
              <div
                key={brand.id}
                className="bg-gradient-to-t from-white/80 to-transparent rounded-xl p-4 flex flex-col items-center shadow-md hover:scale-[1.02] transition-transform duration-200 border border-gray-300"
              >
                <img
                  src={brand.image}
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
