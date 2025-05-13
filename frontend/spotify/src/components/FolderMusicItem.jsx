import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFolder, AiOutlineRight } from "react-icons/ai";

const FolderMusic = ({ id, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between hover:bg-[#2a2a2a] hover:rounded-xl p-2 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#6a6a6a] rounded-md p-2">
          <AiOutlineFolder className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-white font-semibold">{name}</h2>
        </div>
      </div>

      <AiOutlineRight className="text-gray-400 text-xl" />
    </div>
  );
};

export default FolderMusic;
