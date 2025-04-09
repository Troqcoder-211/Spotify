import React, { useState } from "react";
import { assets } from "../assets/img/assets";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin, setIsLogin);

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold ">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          {/* <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer ">
            Install App
          </p> */}
          {isLogin ? (
            <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
              D
            </p>
          ) : (
            <div className="flex space-x-2  p-2 rounded-lg">
              <button className="text-gray-500 font-bold px-4 py-2 hover:transform hover:scale-105">
                Đăng ký
              </button>
              <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:transform hover:scale-105">
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {/* <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p> */}
        <p className="bg-black  px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        {/* <p className="bg-black  px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p> */}
      </div>
    </>
  );
};

export default Navbar;
