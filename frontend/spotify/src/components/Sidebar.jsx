import React, { useState } from "react";

import LikedSongsItem from "./LikedSongsItem";
import FolderMusic from "./FolderMusic";
import AlbumLibrary from "./AlbumLibrary";

import { assets } from "../assets/img/assets";
import { AiOutlineSearch } from "react-icons/ai";
import { LuLibrary } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";

const Sidebar = () => {
  //   console.log(library);

  const [playlist, setPlaylist] = useState([]);
  const [music, setMusic] = useState([
    {
      id: 1,
      name: "Bài hát 1",
      image: assets.baihat1,
      desc: "Bài hát 1",
    },
    {
      id: 2,
      name: "Bài hát 2",
      image: assets.baihat2,
      desc: "Bài hát 2",
    },
    {
      id: 3,
      name: "Bài hát 3",
      image: assets.baihat3,
      desc: "Bài hát 3",
    },
  ]);

  const [album, setAlbum] = useState([
    {
      id: 1,
      name: "Album 1",
      image: assets.album1,
      desc: "Album 1",
      music: music,
    },
    {
      id: 2,
      name: "Album 2",
      image: assets.album2,
      desc: "Album 2",
      music: music,
    },
  ]);

  console.log(playlist + setPlaylist);
  console.log(music + setMusic);
  console.log(album + setAlbum);

  return (
    <div className="w-[25%]  h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div className="bg-[#121212] h-[10%] rounded flex items-center justify-center">
        {/* Home Icon */}
        <div className="flex  items-center gap-3 pl-8 cursor-pointer mx-2">
          <div className="w-12 h-12 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] flex items-center justify-center duration-300">
            <img
              className="w-6 text-white cursor-pointer"
              src={assets.home_icon}
              alt="HomeIcon"
            />
          </div>
        </div>
        {/* Search Icon */}

        <div className=" relative hidden sm:block ">
          <AiOutlineSearch className="absolute text-[20px] top-[16px] left-[10px] text-gray-500" />
          <input
            className="bg-[#F0F2F5] w-full h-12 dark:bg-[#333334] p-2 rounded-full pl-9 outline-none placeholder:text-white"
            type="text"
            placeholder="Bạn cần nghe gì?"
          />
        </div>
      </div>

      <div className="bg-[#121212] h-[95%] rounded">
        <div className="p-4 flex items-center justify-between">
          {/* Your Library */}
          <div className="flex items-center gap-3">
            <div className="text-[#656565] cursor-pointer flex items-center gap-1 hover:text-white duration-200">
              <LuLibrary className="w-8 h-8" />
              <p className="font-semibold">Thư viện</p>
            </div>
          </div>
          {/*  Arrow and Plus */}
          <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-1 bg-[#1f1f1f] px-4 py-1.5 rounded-full hover:bg-[#2a2a2a]">
              <img className="w-5" src={assets.plus_icon} alt="ArrowIcon" />
              <p className="text-white">Tạo</p>
            </div>
            <div className="flex  items-center gap-1 bg-[#1f1f1f] px-4 py-1.5 rounded-full hover:bg-[#2a2a2a]">
              <img
                className="w-5 h-5 cursor-pointer"
                src={assets.arrow_icon}
                alt="ArrowIcon"
              />
            </div>
          </div>
        </div>

        {playlist ? (
          <>
            {/* Classification type */}
            <div className="flex items-center ">
              <button className="mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]">
                PLaylist
              </button>
              <button className="mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]">
                Nghệ sĩ
              </button>
              <button className="mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]">
                Ablum
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Playlist */}
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 ">
              <h1>Tạo danh sách phát đầu tiên của bạn</h1>
              <p className="font-light">Thật dễ dàng, chúng tôi sẽ giúp bạn</p>
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 transition-transform duration-300 hover:scale-105">
                Tạo danh sách phát
              </button>
            </div>
          </>
        )}

        {/* Podcasts */}
        {/* <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 ">
          <h1>Let's findsome podcasts to follow</h1>
          <p className="font-light">ưe'll keep your update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div> */}

        <div className="flex items-center justify-between">
          <div className="mr-4 p-2 flex items-center justify-between hover:rounded-full hover:bg-[#2a2a2a]">
            <AiOutlineSearch className="w-6 h-6" />
          </div>
          <div className="p-4 gap-2 flex items-center justify-center text-[#656565] hover:text-white hover:transition-transform hover:duration-300 hover:scale-105 cursor-pointer">
            <p className="font-semibold ">Gần đây</p>
            <IoMdMenu className=" w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <div className="w-full">
            <LikedSongsItem props={music} />
            <FolderMusic />

            {album.map((album, index) => (
              <AlbumLibrary props={album} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
