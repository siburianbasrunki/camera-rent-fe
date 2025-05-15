import { BiSolidEdit } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
        <div className="text-center mt-2">
          <h1 className="text-xl font-bold p-4">Profile</h1>
        </div>
        <div className="w-full px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 p-3">
            <img
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user"
              className="w-15 h-15 rounded-lg"
            />
            <div>
              <p className="text-lg font-semibold leading-6 text-black">
                Basrunki Siburian
              </p>
              <p className="text-md  leading-5 text-black">Freelance</p>
            </div>
          </div>
          <div>
            <BiSolidEdit
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
        <hr className="border-gray-300" />

        <div className="w-full px-4">
          <div className="flex items-center gap-2 p-3 justify-between" onClick={() => navigate("/booking")}>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
