import React from "react";

const AlbumLibrary = (props) => {
  return (
    <div className="flex items-center gap-4 hover:bg-[#2a2a2a] hover:rounded-xl p-2">
      <div className="flex items-center gap-4">
        <div className=" rounded-md p-2 bg-[#6a6a6a]">
          <img
            src="" // Thay thế bằng URL ảnh bài hát
            alt="Chơi Như Tụi Mỹ"
            className="w-6 h-6 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-white font-semibold">{props.name || "Album"}</h2>
          <p className="text-gray-400 text-sm">
            {props.length === 1 ? `Đĩa đơn` : `Album`} • Andree Right Hand
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumLibrary;
