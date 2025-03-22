import React from "react";
import { assets } from "../assets/img/assets";

const Sidebar = () => {
  //   console.log(library);
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-row justify-around">
        {/* Home Icon */}
        <div className="flex  items-center gap-3 pl-8 cursor-pointer ">
          <div className="w-12 h-12 rounded-full bg-[#1f1f1f] hover:bg-gray-500 flex items-center justify-center hover:w-12.5 hover:h-12.5 duration-300">
            <img
              className="w-6 text-white cursor-pointer"
              src={assets.home_icon}
              alt="HomeIcon"
            />
          </div>
        </div>

        {/* Search Icon */}
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <div className=" flex relative  items-center  w-68 bg-[#201f1f] h-12 rounded-full">
            <img
              className="w-6  cursor-pointer absolute translate-x-2"
              src={assets.search_icon}
              alt="
          SeacrhIcon"
            />
            <input
              className="bg-[#1f1f1f] w-full h-full rounded-full pl-8 focus:outline-none"
              type="text"
              placeholder="Bạn muốn phát nội dung gì?"
            ></input>
          </div>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          {/* Your Library */}
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="StackIcon" />
            <p className="font-semibold">Your Library</p>
          </div>
          {/*  Arrow and Plus */}
          <div className="flex *:flex-items-center gap-3 ">
            <img className="w-5" src={assets.arrow_icon} alt="ArrowIcon" />
            <img className="w-5" src={assets.plus_icon} alt="ArrowIcon" />
          </div>
        </div>

        {/* Playlist */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 ">
          <h1>Create your first playlist</h1>
          <p className="font-light">it's easy, we'll help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create playlist
          </button>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 ">
          <h1>Let's findsome podcasts to follow</h1>
          <p className="font-light">ưe'll keep your update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
