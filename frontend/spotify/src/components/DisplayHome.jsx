import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { albumsData } from "../assets/img/assets";
import { songsData } from "../assets/img/assets";

import { assets } from "../assets/img/assets";
import SingerItem from "./SingerItem";

const DisplayHome = () => {
  const artists = [
    { name: "Sơn Tùng M-TP", image: assets.sontung },
    { name: "Dương Domic", image: assets.sontung },
    { name: "HIEUTHUHAI", image: assets.sontung },
    { name: "ANH TRAI 'SAY HI'", image: assets.sontung },
    { name: "buitruonglinh", image: assets.sontung },
    { name: "Vũ.", image: assets.sontung },
  ];
  return (
    <>
      <Navbar />
      {/* Featured Charts */}
      <div className="mb-4">
        <h1 className="my-5 dont-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => {
            return <AlbumItem key={index} props={item} />;
          })}
        </div>
      </div>
      {/* Today's biggest hits */}
      <div className="mb-4">
        <h1 className="my-5 dont-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => {
            return <SongItem key={index} props={item} />;
          })}
        </div>
      </div>

      {/* Popular artists */}
      <div className="mb-4">
        <h1 className="my-5 dont-bold text-2xl">Nghệ sĩ phổ biến</h1>
        <div className="flex overflow-auto">
          {artists.map((item, index) => {
            return <SingerItem key={index} props={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
