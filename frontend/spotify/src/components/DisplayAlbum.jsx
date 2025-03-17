import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/img/assets";
import { PlayerContext } from "../context/PlayerContext";
const DisplayAlbum = ({ props }) => {
  console.log(props);
  const albumDataFake = {
    likes: 1902126,
    songs: 12,
    times: 240,
  };
  const hours = Math.floor(albumDataFake.times / 60);

  const min = albumDataFake.times % 60;

  // console.log(hours, min);

  const { id } = useParams();

  const album = albumsData[id];

  const { playWithId } = useContext(PlayerContext);

  // console.log(album);
  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
        <img className="w-48 rounded " src={album.image} />
        <div className="flex flex-col">
          <p> Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl ">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b>
            <b>· {albumDataFake.likes} likes </b>
            <b>· {albumDataFake.songs} songs </b>
            <b>· {hours < 1 ? `${min} min` : `${hours} hours ${min} min`}</b>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4 " src={assets.clock_icon} alt="clock icon" />
      </div>
      <hr />
      {songsData.map((song, index) => (
        <div
          onClick={() => playWithId(song.id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 
        p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5 " src={song.image} alt="" />
            {song.name}
          </p>
          <p className="text-[15px]">{album.name}</p>
          <p className="text-[15px] hidden sm:block ">5 days ago</p>
          <p className="text-[15px] text-center">{song.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
