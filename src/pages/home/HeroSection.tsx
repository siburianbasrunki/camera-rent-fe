import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";
import { useBanner } from "../../hook/banner";

const HeroSection = () => {
  const { data, isLoading, isError, error } = useBanner();
  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;
  return (
    <section className="relative overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse items-center">
          <div className="mt-1 relative w-full">
            <div className="relative rounded-b-md overflow-hidden shadow-lg">
              <img
                src={data?.imageUrl}
                alt={data?.title}
                className="object-cover w-full h-[200px] rounded-b-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center px-4 flex-col bg-gradient-to-t from-black/40 to-transparent">
                <h1 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                  {data?.title}
                </h1>
                <h1 className="text-white text-md text-center drop-shadow-lg italic">
                  ~ {data?.subTitle} ~
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
