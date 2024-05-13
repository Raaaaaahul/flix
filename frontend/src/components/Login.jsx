import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../redux/userSlice";
const Login = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://media.assettype.com/freepressjournal/2022-10/85cffc84-3310-4565-8bd7-ba8213ec4795/0af6ce3e_b27a_4722_a5f0_e32af4df3045_what_is_netflix_5_en.png"
  );
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((store) => store.app.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prevImage) => {
        return prevImage ===
          "https://media.assettype.com/freepressjournal/2022-10/85cffc84-3310-4565-8bd7-ba8213ec4795/0af6ce3e_b27a_4722_a5f0_e32af4df3045_what_is_netflix_5_en.png"
          ? "https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg"
          : "https://media.assettype.com/freepressjournal/2022-10/85cffc84-3310-4565-8bd7-ba8213ec4795/0af6ce3e_b27a_4722_a5f0_e32af4df3045_what_is_netflix_5_en.png";
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (isLogin) {
      try {
        const user = { email, password };
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        dispatch(setUser(res.data.user));
        navigate("/browse");
      } catch (error) {
        toast.error("Cant login check credentials");
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(true));
      try {
        const res = await axios.post(
          `${API_END_POINT}/register`,
          {
            fullName,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Header />
      <div
        className="absolute"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          transition: "background-image 1s ease",
        }}
      />
      <form
        onSubmit={getInputData}
        className="flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto items-center justify-center absolute bg-black opacity-80 rounded-md"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">
          {isLogin ? "LogIn" : "SignUp"}
        </h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              type="text"
              placeholder="FullName"
              className="outline-none p-3 my-2 rounded-md bg-gray-800 text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-md bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="outline-none p-3 my-2 rounded-md bg-gray-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-red-600 p-3 mt-6 text-white rounded-md font-medium"
            disabled={isLoading}
          >
            {`${isLoading ? "loading..." : isLogin ? "Login" : "Signup"}`}
          </button>
          <p className="text-white font-medium mt-8">
            {isLogin ? "New to Netflix ? " : "Already Have an Account ?"}
            <span
              className="ml-2 text-red-600 cursor-pointer"
              onClick={loginHandler}
            >
              {isLogin ? "SignUp" : "LogIn"}
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
