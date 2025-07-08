import { BiSolidEdit } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserById } from "../../hook/user";
import { useConfirmation } from "../../components/PopUp";
import { useState } from "react";
import EditProfileModal from "./editProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { data } = useUserById();
  const { showConfirmation } = useConfirmation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleLogout = () => {
    showConfirmation("Apakah Anda yakin ingin logout?", () => {
      logout();
      navigate("/login", { replace: true });
    });
  };

  return (
    <>
      <div className=" bg-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
          <div className="text-center mt-2">
            <h1 className="text-xl font-bold p-4">Profile</h1>
          </div>
          <div className="w-full px-4 flex justify-between items-center">
            <div className="flex items-center gap-2 p-3">
              <img
                src={data?.imageUrl || ""}
                alt="user"
                className="w-15 h-15 rounded-lg"
              />
              <div>
                <p className="text-lg font-semibold leading-6 text-black">
                  {user?.name || "-"}
                </p>
                <p className="text-md  leading-5 text-black">
                  {user?.email || "-"}
                </p>
              </div>
            </div>
            <div>
              <BiSolidEdit
                className="w-6 h-6 text-gray-600 cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              />
            </div>
          </div>
          <hr className="border-gray-300" />

          <div className="w-full px-4">
            <div
              className="flex items-center gap-2 p-3 justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => navigate("/booking")}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <FaClipboardList className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-md font-semibold leading-6 text-black">
                  My Booking
                </p>
              </div>
              <div>
                <IoIosArrowForward className="w-10 h-5 text-gray-600" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 p-3 justify-between cursor-pointer hover:bg-gray-50"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <IoLogOutOutline className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-md font-semibold leading-6 text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={{
          name: data?.name || "",
          phoneNumber: data?.phoneNumber || "",
          imageUrl: data?.imageUrl || "",
        }}
      />
    </>
  );
};

export default Profile;
