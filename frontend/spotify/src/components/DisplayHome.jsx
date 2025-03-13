import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { albumsData } from "../assets/img/assets";
import { songsData } from "../assets/img/assets";

const DisplayHome = () => {
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
    </>
  );
};

export default DisplayHome;
