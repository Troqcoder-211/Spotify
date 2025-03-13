import React from "react";

const SongItem = ({ props }) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img className="rounded " src={props.image} alt="" />
      <p cllassName="font-bold mt-2 mb-1">{props.name}</p>
      <p className="text-slate-200 text-sm">{props.desc}</p>
    </div>
  );
};

export default SongItem;
