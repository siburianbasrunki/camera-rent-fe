import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCameraRetro,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";

const BottomNav = () => {
  const location = useLocation();

  // Fungsi untuk mengecek apakah path aktif
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-md mx-auto w-full px-4 pb-4">
        <div className="relative">
          <div className="bg-white rounded-full shadow-xl p-2 flex justify-around items-center">
            <Link 
              to="/" 
              className={`p-2 ${isActive("/") ? "text-indigo-600" : "text-gray-600"} hover:text-indigo-600`}
            >
              <FaHome className="w-6 h-6" />
            </Link>
            
            <Link 
              to="/balance" 
              className={`p-2 ${isActive("/balance") ? "text-indigo-600" : "text-gray-600"} hover:text-indigo-600`}
            >
              <MdCreditCard className="w-6 h-6" />
            </Link>

            <div className="relative -mt-12">
              <Link
                to="/camera"
                className={`flex items-center justify-center w-16 h-16 rounded-full ${isActive("/camera") ? "bg-gradient-to-r from-indigo-700 to-blue-700" : "bg-gradient-to-r from-indigo-600 to-blue-600"} text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all`}
              >
                <FaCameraRetro className="w-8 h-8" />
              </Link>
            </div>

            <Link 
              to="/booking" 
              className={`p-2 ${isActive("/booking") || location.pathname.startsWith("/booking/") ? "text-indigo-600" : "text-gray-600"} hover:text-indigo-600`}
            >
              <FaClipboardList className="w-6 h-6" />
            </Link>
            
            <Link 
              to="/profile" 
              className={`p-2 ${isActive("/profile") ? "text-indigo-600" : "text-gray-600"} hover:text-indigo-600`}
            >
              <FaUser className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;