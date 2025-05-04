import React, { useState, useEffect } from "react";
import { FaMusic, FaCompactDisc, FaUserAlt } from "react-icons/fa";
import AddSongForm from "./components/AddSongForm";
import AddAlbumForm from "./components/AddAlbumForm";
import AddArtistForm from "./components/AddArtistForm";
import AddUserForm from "./components/AddUserForm";
import TrackService from "../../services/TrackService";
import ArtistService from "../../services/ArtistService";
import ArtistTrackService from "../../services/ArtistTrackService";
import AlbumService from "../../services/AlbumService";
import ArtistAlbumService from "../../services/ArtistAlbumService";
import UserService from "../../services/UserService";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("songs");
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [showAddArtistForm, setShowAddArtistForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [trackArtists, setTrackArtists] = useState({});
  const [albumArtists, setAlbumArtists] = useState({});
  const [albumTotalSongs, setAlbumTotalSongs] = useState({});

  const stats = [
    { label: "Total Songs", value: tracks.length, icon: "🎵" },
    { label: "Total Albums", value: albums.length, icon: "💿" },
    { label: "Total Artists", value: artists.length, icon: "👤" },
    { label: "Total Users", value: users.length, icon: "🔊" },
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

  const loadAlbums = async () => {
    try {
      const response = await AlbumService.getAll();
      if (response.success) {
        setAlbums(response.data);
        
        // Load total songs for each album
        const totalSongsMap = {};
        for (const album of response.data) {
          const tracksResponse = await TrackService.getByAlbum(album.album_id);
          if (tracksResponse.success) {
            totalSongsMap[album.album_id] = tracksResponse.data.length;
          }
        }
        setAlbumTotalSongs(totalSongsMap);
        console.log(albumTotalSongs);
      }
    } catch (error) {
      console.error("Error loading albums:", error);
      alert("Không thể tải danh sách album");
    }
  };

  const loadArtists = async () => {
    try {
      const response = await ArtistService.getAllWithStats();
      if (response.success) {
        setArtists(response.data);
      }
    } catch (error) {
      console.error("Error loading artists:", error);
      alert("Không thể tải danh sách nghệ sĩ");
    }
  };

  const loadTrackArtists = async () => {
    try {
      const artistsMap = {};
      for (const track of tracks) {
        const response = await ArtistTrackService.getArtistsByTrackId(track.track_id);
        if (response.success) {
          const artistNames = [];
          for (const artistId of response.data) {
            const artistResponse = await ArtistService.getById(artistId);
            if (artistResponse.success) {
              artistNames.push(artistResponse.data.name);
            }
          }
          artistsMap[track.track_id] = artistNames.join(', ');
        } else {
          artistsMap[track.track_id] = 'Unknown';
        }
      }
      setTrackArtists(artistsMap);
    } catch (error) {
      console.error("Error loading track artists:", error);
    }
  };

  const loadAlbumArtists = async () => {
    try {
      const artistsMap = {};
      for (const album of albums) {
        const response = await ArtistAlbumService.getArtistsByAlbumId(album.album_id);
        if (response.success) {
          const artistNames = [];
          for (const artistAlbum of response.data) {
            const artistResponse = await ArtistService.getById(artistAlbum.artist);
            if (artistResponse.success) {
              artistNames.push(artistResponse.data.name);
            }
          }
          artistsMap[album.album_id] = artistNames.join(', ');
        } else {
          artistsMap[album.album_id] = 'Unknown';
        }
      }
      setAlbumArtists(artistsMap);
    } catch (error) {
      console.error("Error loading album artists:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await UserService.getAll();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Không thể tải danh sách người dùng");
    }
  };

  useEffect(() => {
    loadTracks();
    loadAlbums();
    loadArtists();
    loadUsers();
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      loadTrackArtists();
    }
  }, [tracks]);

  useEffect(() => {
    if (albums.length > 0) {
      loadAlbumArtists();
    }
  }, [albums]);

  const handleDeleteTrack = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài hát này?")) {
      try {
        const response = await TrackService.delete(id);
        if (response.success) {
          alert("Xóa bài hát thành công!");
          loadTracks();
        }
      } catch (error) {
        alert("Không thể xóa bài hát");
      }
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa album này?")) {
      try {
        const response = await AlbumService.delete(id);
        if (response.success) {
          alert("Xóa album thành công!");
          loadAlbums();
        }
      } catch (error) {
        alert("Không thể xóa album");
      }
    }
  };

  const handleDeleteArtist = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nghệ sĩ này?")) {
      try {
        const response = await ArtistService.delete(id);
        if (response.success) {
          alert("Xóa nghệ sĩ thành công!");
          loadArtists();
        }
      } catch (error) {
        alert("Không thể xóa nghệ sĩ");
      }
    }
  };

  const handleSuspendUser = async (id) => {
    if (window.confirm("Bạn có chắc muốn tạm dừng người dùng này?")) {
      try {
        const response = await UserService.suspend(id);
        if (response.success) { 
          alert("Tạm dừng người dùng thành công!");
          loadUsers();
        }
      } catch (error) {
        alert("Không thể tạm dừng người dùng");
      }
    }
  };

  const handleActiveUser = async (id) => {
    if (window.confirm("Bạn có chắc muốn kích hoạt người dùng này?")) {
      try {
        const response = await UserService.active(id);
        if (response.success) {
          alert("Kích hoạt người dùng thành công!");
          loadUsers(); 
        }
      } catch (error) {
        alert("Không thể kích hoạt người dùng");
      }
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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
            <AddAlbumForm 
              onClose={() => setShowAddAlbumForm(false)}
              onSuccess={() => {
                loadAlbums();
                setShowAddAlbumForm(false);
              }}
            />
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
        {showAddUserForm && (
          <div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowAddUserForm(false)}
            ></div>
            <AddUserForm
              onClose={() => setShowAddUserForm(false)}
              onSuccess={() => {
                loadUsers();
                setShowAddUserForm(false);
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
        <div className="flex bg-[#2a2a2a] border border-gray-700 rounded-md p-1 mb-4 w-[480px]">
          <button
            onClick={() => setActiveTab("songs")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "songs" ? "bg-gray-700 text-white" : ""}`}
          >
            <FaMusic className="mr-2" />
            Songs
          </button>
          <button
            onClick={() => setActiveTab("albums")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "albums" ? "bg-gray-700 text-white" : ""}`}
          >
            <FaCompactDisc className="mr-2" />
            Albums
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "artists" ? "bg-gray-700 text-white" : ""}`}
          >
            <FaUserAlt className="mr-2" />
            Artists
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center px-4 py-2 rounded-md w-[120px]
            ${activeTab === "users" ? "bg-gray-700 text-white" : ""}`}
          >
            <FaUserAlt className="mr-2" />
            Users
          </button>
        </div>
        {/* Khu vực quản lý */}
        <div className="bg-[#2a2a2a] p-4 rounded-lg shadow">
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
                    <th className="pb-2">Duration</th>
                    <th className="pb-2">Upload Date</th>
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
                      <td>{trackArtists[track.track_id] || 'Unknown'}</td>
                      <td>{formatDuration(track.duration)}</td>
                      <td>{formatDate(track.created_at)}</td>
                      <td className="text-center">
                        <button 
                          className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                          onClick={() => handleDeleteTrack(track.track_id)}
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
          {activeTab === "albums" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">💿 Albums Library</h2>
                <button
                  className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400"
                  onClick={() => setShowAddAlbumForm(!showAddAlbumForm)}
                  
                >
                  + Add Album
                </button>
              </div>

              {/* Table danh sách album */}
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Artist</th>
                    <th className="pb-2">Release Date</th>
                    <th className="pb-2">Total Songs</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-center">Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-2">{album.title}</td>
                      <td>{albumArtists[album.album_id] || 'Unknown'}</td>
                      <td>{formatDate(album.release_date)}</td>
                      <td>{albumTotalSongs[album.album_id] || 0}</td>
                      <td>{album.is_active ? "Active" : "Inactive"}</td>
                      <td className="text-center">
                        <button 
                          className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                          onClick={() => handleDeleteAlbum(album.album_id)}
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
          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">👤 Users Management</h2>
                <button
                  className="bg-green-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-green-400"
                  onClick={() => setShowAddUserForm(true)}
                >
                  + Add User
                </button>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2">Username</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Full Name</th>
                    <th className="pb-2">Account Type</th>
                    <th className="pb-2">Country</th>
                    <th className="pb-2">Join Date</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-2">{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.full_name || '-'}</td>
                      <td>{user.account_type}</td>
                      <td>{user.country || '-'}</td>
                      <td>{formatDate(user.created_at)}</td>
                      <td>{user.is_active ? "Active" : "Suspended"}</td>
                      <td className="text-center">
                        {user.is_active ? (
                          <button
                            className="bg-red-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-red-400"
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 px-2 py-1 rounded-md text-sm m-4 hover:bg-green-400"
                            onClick={() => handleActiveUser(user.id)}
                          >
                            Active
                          </button>
                        )}
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
