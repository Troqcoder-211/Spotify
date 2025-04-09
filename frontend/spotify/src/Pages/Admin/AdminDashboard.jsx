import React from "react";
import { FaMusic, FaCompactDisc } from "react-icons/fa";
const AdminDashboard = () => {
  // Dữ liệu thống kê (dummy data)
  const stats = [
    { label: "Total Songs", value: 14, icon: "🎵" },
    { label: "Total Albums", value: 4, icon: "💿" },
    { label: "Total Artists", value: 15, icon: "👤" },
    { label: "Total Users", value: 1, icon: "🔊" },
  ];

  // Dữ liệu bảng (dummy data)
  const songs = [
    { title: "Into The Wild", artist: "Tate McRae", releaseDate: "2023-02-14" },
    {
      title: "Neon Love",
      artist: "Electric Dreams",
      releaseDate: "2023-01-11",
    },
    {
      title: "Purple Sunset",
      artist: "Dream Valley",
      releaseDate: "2022-12-25",
    },
    {
      title: "City Lights",
      artist: "Night Flowers",
      releaseDate: "2022-10-08",
    },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
    { title: "Cyber Pulse", artist: "Cyber Ride", releaseDate: "2022-09-20" },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white p-8">
      {/* Tiêu đề trang */}
      <h1 className="text-3xl font-bold">Music Manager</h1>
      <p className="text-gray-400 mb-8">Manage your music catalog</p>

      {/* Khu vực thống kê */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#2a2a2a] p-4 rounded-lg shadow flex items-center space-x-4"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Song and album section */}
      <div class="w-[16%]">
        <div className="flex bg-g[#2a2a2a] border border-gray-700 rounded-md p-1 mb-4">
          {" "}
          {/* Nền xám đậm, bo tròn, padding nhỏ */}
          <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md mr-1">
            {" "}
            {/* Nút Songs */}
            <FaMusic className="mr-2" /> {/* Icon nốt nhạc */}
            Songs
          </button>
          <button className="flex items-center text-gray-400 px-4 py-2 rounded-md">
            {" "}
            {/* Nút Albums */}
            <FaCompactDisc className="mr-2" /> {/* Icon đĩa CD */}
            Albums
          </button>
        </div>
      </div>

      {/* Khu vực quản lý bài hát */}
      <div className="bg-[#2a2a2a] p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🎶 Songs Library</h2>
          <button className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400">
            + Add Song
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2">Title</th>
              <th className="pb-2">Artist</th>
              <th className="pb-2">Release Date</th>
              <th className="pb-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="py-2">{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.releaseDate}</td>
                <td className="text-center">
                  <button className="bg-red-500 px-2 py-1 rounded-md text-sm hover:bg-red-400">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
