import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/img/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[1]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id === 0) return;

    await setTrack(songsData[track.id - 1]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const next = async () => {
    if (track.id === songsData.length - 1) return;
    await setTrack(songsData[track.id + 1]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const seekSong = async (e) => {
    // console.log(e);
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        }%`;

        setTime({
          currentTime: {
            minute: Math.floor(audioRef.current.currentTime / 60),
            second: Math.floor(audioRef.current.currentTime % 60),
          },
          totalTime: {
            minute: Math.floor(audioRef.current.duration / 60),
            second: Math.floor(audioRef.current.duration % 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
