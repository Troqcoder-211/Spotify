import React, { useContext } from "react";
import { assets } from "../assets/img/assets";
import { PlayerContext } from "../context/PlayerContext";
const Player = () => {
  // console.log(props);

  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  // console.log({ time });

  // console.log(
  //   seekBar + " " + seekBg + " " + playStatus + " " + play + " " + pause
  // );

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 ">
      {/* Image and text */}
      <div className="hidden lg:flex items-center gap-4 ">
        <img className="w-12" src={track.image} alt="anhbaihat" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
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
            onClick={previous}
            className="w-4 cursor-pointer "
            src={assets.prev_icon}
            alt="prev"
          />

          {/* play and pause button */}
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer "
              src={assets.pause_icon}
              alt="pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer "
              src={assets.play_icon}
              alt="play"
            />
          )}

          <img
            onClick={next}
            className="w-4 cursor-pointer "
            src={assets.next_icon}
            alt="next"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.loop_icon}
            alt="loop"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:
            {time.currentTime.second < 10
              ? `0${time.currentTime.second}`
              : time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-10 bg-green-800 rounded-full"
            ></hr>
          </div>
          <p>
            {time.totalTime.minute}:
            {time.totalTime.second < 10
              ? `0${time.totalTime.second}`
              : time.totalTime.second}
          </p>
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
