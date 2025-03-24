import React from "react";
import { AiFillHeart, AiOutlineSound } from "react-icons/ai";
const LikedSongsItem = (props) => {
  //   console.log(props);
  return (
    <div className="flex items-center justify-between hover:bg-[#2a2a2a] hover:rounded-xl p-2">
      <div className="flex items-center gap-4">
        <div
          className="bg-gradient-to-r from-purple-500
         to-blue-500 rounded-md p-2"
        >
          <AiFillHeart className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-white font-semibold">Bài hát đã thích</h2>
          <p className="text-gray-400 text-sm">
            Danh sách phát • {props.length} bài hát
          </p>
        </div>
      </div>

      <AiOutlineSound className="text-green-500 text-2xl" />
    </div>
  );
};

export default LikedSongsItem;
