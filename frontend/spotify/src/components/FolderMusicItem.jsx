import React from "react";

import { AiOutlineFolder, AiOutlineRight } from "react-icons/ai";
const FolderMusic = ({ name }) => {
  return (
    <div className="flex items-center justify-between hover:bg-[#2a2a2a] hover:rounded-xl p-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#6a6a6a] rounded-md p-2">
          <AiOutlineFolder className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-white font-semibold">{name}</h2>
          {/* <p className="text-gray-400 text-sm">1 danh sách phát, 1 thư mục</p> */}
        </div>
      </div>

      <AiOutlineRight className="text-gray-400 text-xl" />
    </div>
  );
};

export default FolderMusic;
