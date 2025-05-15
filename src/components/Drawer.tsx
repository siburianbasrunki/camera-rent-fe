import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Drawer = ({ isOpen, onClose, children, title }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0  bg-opacity-25 z-40 border-2 border-solid"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto border border-solid rounded-md bg-white">
        <div className=" rounded-t-2xl shadow-xl p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {title || "Menu"}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          <div className="pb-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
