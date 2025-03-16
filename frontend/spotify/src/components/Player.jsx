import React, { useContext } from "react";
import { assets, songsData } from "../assets/img/assets";
import { PlayerContext } from "../context/PlayerContext";
const Player = (props) => {
  console.log(props);

  const { seekBar, seekBg } = useContext(PlayerContext);

  console.log(seekBar + " " + seekBg);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 ">
      {/* Image and text */}
      <div className="hidden lg:flex items-center gap-4 ">
        <img className="w-12" src={songsData[0].image} alt="anhbaihat" />
        <div>
          <p>{songsData[0].name}</p>
          <p>{songsData[0].desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* controls  */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer "
            src={assets.shuffle_icon}
            alt="shuffle"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.prev_icon}
            alt="shuffle"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.play_icon}
            alt="shuffle"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.next_icon}
            alt="shuffle"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.loop_icon}
            alt="shuffle"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>1:06</p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr className="h-1 border-none w-10 bg-green-800 rounded-full"></hr>
          </div>
          <p>3:06</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4 " src={assets.play_icon} alt="play" />
        <img className="w-4 " src={assets.mic_icon} alt="play" />
        <img className="w-4 " src={assets.queue_icon} alt="play" />
        <img className="w-4 " src={assets.speaker_icon} alt="play" />
        <img className="w-4 " src={assets.volume_icon} alt="play" />
        <div className="w-20 bg-slate-50 h-1 rounded "></div>
        <img className="w-4 " src={assets.mini_player_icon} alt="play" />
        <img className="w-4 " src={assets.zoom_icon} alt="play" />
      </div>
    </div>
  );
};

export default Player;
