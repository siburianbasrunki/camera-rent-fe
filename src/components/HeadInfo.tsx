import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserById } from "../hook/user";

const HeadInfoAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
    const { data } = useUserById();
  
  console.log('user', user);
  
  return (
    <div className="sticky top-0 left-0 right-0 z-50 ">
      <div className="flex items-center justify-between gap-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-md">
        <div>
          <p className="text-md  leading-6 text-white">Hello,</p>
          <p className="text-lg font-semibold leading-5 text-white">
            {user?.name}
          </p>
        </div>
        <img
          onClick={() => {
            navigate("/profile");
          }}
          src={data?.imageUrl || ""}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};
export default HeadInfoAccount;
