import { formatRupiah } from "../../helper/formatRupiah";
import { CameraData } from "../../store/brand";

export const CameraSection = () => {
  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">List Camera</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {CameraData.map((camera) => (
            <>
              <div
                key={camera.id}
                className="bg-white rounded-xl p-4 flex flex-col shadow-md hover:scale-[1.02] transition-transform duration-200 border border-gray-300"
              >
                <div className="flex justify-center">
                  <img
                    src={camera.image}
                    alt={camera.name}
                    className="w-52 h-52 object-cover rounded-md"
                  />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-md font-semibold text-black">
                    {camera.name}
                  </p>
                  <p className="text-md font-semibold text-black">
                    {formatRupiah(camera.price)} / day
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
