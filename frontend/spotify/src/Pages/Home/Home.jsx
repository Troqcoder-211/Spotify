import React, { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import Player from "../../components/Player";
import Display from "../../components/Display";
import { PlayerContext } from "../../context/PlayerContext";
const Home = () => {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <>
      <div className="h-screen bg-black min-h-screen ">
        <div className="h-[90%] flex">
          <Sidebar />
          <Display />
        </div>
        <Player />
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      </div>
    </>
  );
};

export default Home;
