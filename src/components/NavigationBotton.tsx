import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCameraRetro,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";

const BottomNav = () => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="relative">
          <div className="bg-white rounded-full shadow-xl p-2 flex justify-around items-center">
            <Link to="/" className="p-2 text-gray-600 hover:text-indigo-600">
              <FaHome className="w-6 h-6" />
            </Link>
            <Link to="/" className="p-2 text-gray-600 hover:text-indigo-600">
              <FaSearch className="w-6 h-6" />
            </Link>

            <div className="relative -mt-12">
              <Link
                to="/"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                <FaCameraRetro className="w-8 h-8" />
              </Link>
            </div>

            <Link to="/booking" className="p-2 text-gray-600 hover:text-indigo-600">
              <FaClipboardList className="w-6 h-6" />
            </Link>
            <Link to="/profile" className="p-2 text-gray-600 hover:text-indigo-600">
              <FaUser className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;