import axios from "axios";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector((store) => store.movie.toggle);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      toast.error("internal server error");
      console.log(error);
    }
  };

  const toggleSearch = () => {
    console.log(toggle);
    dispatch(setToggle());
  };

  return (
    <>
      <div className="absolute z-10 flex w-[100%] items-center justify-between px-7 bg-gradient-to-b from-black">
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="netflix-logo"
          className="w-56 mt-3"
        />
        {user && (
          <div className="flex items-center">
            <IoIosArrowDropdown size="24px" color="white" />
            <h1 className="text-lg font-medium text-white">{user.fullName}</h1>
            <div className="ml-4">
              <button
                className="bg-red-700 text-white px-4 py-2"
                onClick={logoutHandler}
              >
                Logout
              </button>
              <button
                onClick={toggleSearch}
                className="bg-red-700 text-white px-4 py-2 ml-2"
              >
                {toggle ? "Home" : "Search Movie"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
