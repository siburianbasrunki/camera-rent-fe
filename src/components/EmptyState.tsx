import NotFoundImg from "../assets/notfound.webp";
type Props = {
  title: string;
};
export const EmptyState = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center  h-[440px]">
      <img src={NotFoundImg} alt="not found" className="rounded-md shadow " />
      <h1 className="text-lg font-bold text-gray-800 text-center">{title}</h1>
    </div>
  );
};
