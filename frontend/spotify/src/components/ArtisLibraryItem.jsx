import React from "react";

const ArtisLibraryItem = () => {
  return (
    <div className="flex items-center gap-4 hover:bg-[#2a2a2a] hover:rounded-xl p-2">
      <div className=" rounded-full p-2 bg-[#6a6a6a]">
        <img
          src="url_anh_nghe_si" // Thay thế bằng URL ảnh nghệ sĩ
          alt="TaynguyenSound"
          className="w-6 h-6 rounded-full"
        />
      </div>
      <div>
        <h2 className="text-white font-semibold">TaynguyenSound</h2>
        <p className="text-gray-400 text-sm">Nghệ sĩ</p>
      </div>
    </div>
  );
};

export default ArtisLibraryItem;
