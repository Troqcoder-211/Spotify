import React, { useState, useEffect } from "react";
import { FaMusic, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import AddSongForm from "./components/AddSongForm";
import AddAlbumForm from "./components/AddAlbumForm";
import AddArtistForm from "./components/AddArtistForm";
import TrackService from "../../services/TrackService";
import ArtistService from "../../services/ArtistService";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("songs");
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [showAddArtistForm, setShowAddArtistForm] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  const stats = [
    { label: "Total Songs", value: tracks.length, icon: "🎵" },
    { label: "Total Albums", value: 4, icon: "💿" },
    { label: "Total Artists", value: artists.length, icon: "👤" },
    { label: "Total Users", value: 1, icon: "🔊" },
  ];

  const loadTracks = async () => {
    try {
      const response = await TrackService.getAll();
      if (response.success) {
        setTracks(response.data);
      }
    } catch (error) {
      console.error("Error loading tracks:", error);
      alert("Không thể tải danh sách bài hát");
    }
  };

  const loadArtists = async () => {
    try {
      const response = await ArtistService.getAll();
      if (response.success) {
        setArtists(response.data);
      }
    } catch (error) {
      console.error("Error loading artists:", error);
      alert("Không thể tải danh sách nghệ sĩ");
    }
  };

  useEffect(() => {
    loadTracks();
    loadArtists();
  }, []);

  const handleDeleteTrack = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài hát này?")) {
      try {
        const response = await TrackService.delete(id);
        if (response.success) {
          alert("Xóa bài hát thành công!");
          loadTracks(); // Tải lại danh sách
        }
      } catch (error) {
        alert("Không thể xóa bài hát");
      }
    }
  };

  const handleDeleteArtist = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nghệ sĩ này?")) {
      try {
        const response = await ArtistService.delete(id);
        if (response.success) {
          alert("Xóa nghệ sĩ thành công!");
          loadArtists(); // Tải lại danh sách
        }
      } catch (error) {
        alert("Không thể xóa nghệ sĩ");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white p-8">
      {/* Form thêm bài hát */}
      <div className="relative">
        {showAddSongForm && (
          <div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowAddSongForm(false)}
            ></div>
            <AddSongForm
              onClose={() => setShowAddSongForm(false)}
              onSuccess={() => {
                loadTracks();
                setShowAddSongForm(false);
              }}
            />
          </div>
        )}
        {showAddAlbumForm && (
          <div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowAddAlbumForm(false)}
            ></div>
            <AddAlbumForm onClose={() => setShowAddAlbumForm(false)} />
          </div>
        )}
        {showAddArtistForm && (
          <div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowAddArtistForm(false)}
            ></div>
            <AddArtistForm 
              onClose={() => setShowAddArtistForm(false)}
              onSuccess={() => {
                loadArtists();
                setShowAddArtistForm(false);
              }}
            />
          </div>
        )}
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
        {/* Song, album and artist section */}
        <div className="flex bg-g[#2a2a2a] border border-gray-700 rounded-md p-1 mb-4 w-[360px]">
          {/* Nền xám đậm, bo tròn, padding nhỏ */}
          <button
            onClick={() => setActiveTab("songs")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "songs" ? "bg-gray-700 text-white" : ""}`}
          >
            {/* Nút Songs */}
            <FaMusic className="mr-2" /> {/* Icon nốt nhạc */}
            Songs
          </button>
          <button
            onClick={() => setActiveTab("albums")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "albums" ? "bg-gray-700 text-white" : ""}`}
          >
            {/* Nút Albums */}
            <FaCompactDisc className="mr-2" /> {/* Icon đĩa CD */}
            Albums
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "artists" ? "bg-gray-700 text-white" : ""}`}
          >
            {/* Nút Artists */}
            <FaUserAlt className="mr-2" /> {/* Icon nghệ sĩ */}
            Artists
          </button>
        </div>
        {/* Khu vực quản lý */}
        <div className="bg-[#2a2a2a] p-4 rounded-lg shadow">
          {activeTab === "albums" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">🎶 Albums Library</h2>
                <button
                  onClick={() => setShowAddAlbumForm(!showAddAlbumForm)}
                  className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400"
                >
                  + Add Albums
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
                  {tracks.map((track, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-2">{track.title}</td>
                      <td>{track.artist}</td>
                      <td>{new Date(track.created_at).toLocaleDateString()}</td>
                      <td className="text-center">
                        <button 
                          className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                          onClick={() => handleDeleteTrack(track.id)}
                        >
                          Delete
                        </button>
                        <button className="bg-green-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-green-400">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "songs" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">🎶 Songs Library</h2>
                <button
                  className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400"
                  onClick={() => setShowAddSongForm(!showAddSongForm)}
                >
                  + Add Songs
                </button>
              </div>

              {/* Table danh sách bài hát */}
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
                  {tracks.map((track, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-2">{track.title}</td>
                      <td>{track.artist}</td>
                      <td>{new Date(track.created_at).toLocaleDateString()}</td>
                      <td className="text-center">
                        <button 
                          className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                          onClick={() => handleDeleteTrack(track.id)}
                        >
                          Delete
                        </button>
                        <button className="bg-green-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-green-400">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "artists" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">👤 Artists Library</h2>
                <button
                  className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400"
                  onClick={() => setShowAddArtistForm(!showAddArtistForm)}
                >
                  + Add Artist
                </button>
              </div>

              {/* Table danh sách nghệ sĩ */}
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Bio</th>
                    <th className="pb-2">Country</th>
                    <th className="pb-2">Total Songs</th>
                    <th className="pb-2">Total Albums</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-2">{artist.name}</td>
                      <td>{artist.bio}</td>
                      <td>{artist.country}</td>
                      <td>{artist.total_songs || 0}</td>
                      <td>{artist.total_albums || 0}</td>
                      <td>{artist.is_active ? "Active" : "Inactive"}</td>
                      <td className="text-center">
                        <button 
                          className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                          onClick={() => handleDeleteArtist(artist.id)}
                        >
                          Delete
                        </button>
                        <button className="bg-green-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-green-400">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
