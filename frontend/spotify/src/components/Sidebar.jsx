import React from "react";
import { assets } from "../assets/img/assets";

const Sidebar = () => {
  //   console.log(library);
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        {/* Home Icon */}
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img clasname="w-6" src={assets.home_icon} alt="HomeIcon" />
          <p className="fonr-bold">Home</p>
        </div>

        {/* Search Icon */}
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img
            clasname="w-6"
            src={assets.search_icon}
            alt="
          SeacrhIcon"
          />
          <p className="fonr-bold">Seach</p>
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
          <p clasName="font-light">it's easy, we'll help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create playlist
          </button>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 ">
          <h1>Let's findsome podcasts to follow</h1>
          <p clasName="font-light">ưe'll keep your update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
