
import React, { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaPlus, FaDownload, FaEllipsisH, FaSave, FaEdit, FaTrash } from 'react-icons/fa';
import PlaylistService from '../services/PlaylistService';
import { useParams } from 'react-router-dom';


const PlaylistDetail = () => {
    const { playWithFile } = useContext(PlayerContext);
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedCover, setEditedCover] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedTracks, setAddedTracks] = useState([]);

    const getPlaylistDetail = async () => {
        try {
            console.log("PlaylistId nhận được khi lấy Playlistdetail: " + id);
            const res = await PlaylistService.getPlaylistDetail(id);
            if (res.success) {
                setPlaylist(res.data);
                setEditedCover(res.data.cover_img_url || '');
                setEditedDescription(res.data.description || '');
                getTracksByPlaylist(id);
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết playlist:', error);
        }
    };

    const getTracksByPlaylist = async (playlistId) => {
        try {
            const res = await PlaylistService.getTracksByPlaylistId(playlistId);
            if (res.success) {
                setAddedTracks(res.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách track:', error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                cover_img_url: editedCover,
                description: editedDescription,
            };
            const res = await PlaylistService.updatePlaylist(id, updatedData);
            if (res.success) {
                await getPlaylistDetail(id);
                setIsEditing(false);
            } else {
                alert('Không thể cập nhật playlist.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const res = await PlaylistService.searchTracks(query);
            if (res.success) {
                setSearchResults(res.data);
            } else {
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleAddTrack = async (track) => {
        const trackId = track.track_id;
        if (!addedTracks.some(t => t.track_id === trackId)) {
            const res = await PlaylistService.addTrackToPlaylist(id, trackId);
            if (res.success) {
                setAddedTracks((prev) => [...prev, track]);
            } else {
                alert("Không thể thêm bài hát vào playlist.");
            }
        }
    };

    const handleRemoveTrack = async (trackId) => {
        try {
            const res = await PlaylistService.removeTrackFromPlaylist(id, trackId);
            if (res.success) {
                setAddedTracks((prev) => prev.filter((t) => t.track_id !== trackId));
            } else {
                alert("Không thể xóa bài hát khỏi playlist.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa bài hát:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getPlaylistDetail(id);
        }
    }, [id]);

    if (!playlist) return <p className="text-white px-8 py-6">Đang tải...</p>;

    return (
        <div className="w-full h-full text-white px-8 py-6 bg-black overflow-y-auto">
            {/* Header Playlist */}
            <div className="flex gap-6 items-center">
                <img
                    src={editedCover || 'https://via.placeholder.com/200x200?text=No+Cover'}
                    alt="Playlist cover"
                    className="w-48 h-48 object-cover rounded shadow-md"
                />
                <div className="flex-1">
                    <h1 className="text-6xl font-bold">
                        {playlist?.name ? playlist.name : `Danh sách phát của tôi #${id}`}
                    </h1>
                    {isEditing ? (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="URL ảnh bìa"
                                value={editedCover}
                                onChange={(e) => setEditedCover(e.target.value)}
                                className="w-full p-2 mt-2 rounded bg-[#2a2a2a] text-white border border-gray-600 placeholder-gray-400"
                            />
                            <textarea
                                placeholder="Mô tả"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                className="w-full p-2 mt-2 rounded bg-[#2a2a2a] text-white border border-gray-600 placeholder-gray-400"
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
                                onClick={handleSave}
                            >
                                <FaSave /> Lưu
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-400 mt-2 italic">{playlist.description}</p>
                            <button
                                className="mt-2 px-3 py-1 border border-gray-400 text-gray-300 rounded hover:bg-gray-700 flex items-center gap-2"
                                onClick={() => setIsEditing(true)}
                            >
                                <FaEdit /> Chỉnh sửa ảnh và mô tả
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-8">
                <button className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center text-black text-xl"
                    onClick={() => {
                        if (addedTracks.length > 0) {
                            playWithFile(addedTracks[0]);  // Phát bài hát đầu tiên
                        } else {
                            alert("Playlist này không có bài hát!");
                        }
                    }}
                >
                    <FaPlay />
                </button>
                <button className="text-white text-xl"><FaDownload /></button>
                <button className="text-white text-xl"><FaPlus /></button>
                <button className="text-white text-xl"><FaEllipsisH /></button>
            </div>

            {/* Table Header */}
            <div className="mt-8 border-b border-gray-700 pb-2 text-gray-400 grid grid-cols-7">
                <span className="col-span-1">#</span>
                <span className="col-span-2">Title</span>
                <span className="col-span-1">Album</span>
                <span className="col-span-1">Date added</span>
                <span className="col-span-1 text-right">Time</span>
                <span className="col-span-1 text-right">Actions</span>
            </div>

            {/* Added Tracks */}
            <div>
                {addedTracks.map((track, index) => (
                    <div key={index} className="grid grid-cols-7 items-center text-white py-4 hover:bg-[#2a2a2a] transition rounded">
                        <span className="col-span-1">{index + 1}</span>
                        <div className="col-span-2 flex items-center gap-4">
                            <img src={track.cover || 'https://via.placeholder.com/50'} alt="cover" className="w-12 h-12 rounded" />
                            <div>
                                <p className="font-semibold">{track.name}</p>
                                <p className="text-sm text-gray-400">{track.artist}</p>
                            </div>
                        </div>
                        <span className="col-span-1">{track.album}</span>
                        <span className="col-span-1">{track.dateAdded}</span>
                        <span className="col-span-1 text-right">{track.duration}</span>
                        <span className="col-span-1 text-right">
                            <button
                                onClick={() => handleRemoveTrack(track.track_id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </span>
                    </div>
                ))}
            </div>

            {/* Search Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Tìm bài hát thêm vào playlist</h2>
                <div className="bg-[#1a1a1a] rounded px-4 py-2 flex items-center w-1/2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài hát..."
                        className="bg-transparent text-white outline-none flex-1"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="text-gray-400 text-xl" onClick={() => setSearchQuery('')}>&times;</button>
                </div>
                <div className="mt-4">
                    {searchResults.length > 0 ? (
                        searchResults.map((track, index) => (
                            <div key={index} className="flex justify-between items-center text-white py-2">
                                <div className="flex items-center gap-4">
                                    <img src={track.cover || 'https://via.placeholder.com/50'} alt="cover" className="w-12 h-12 rounded" />
                                    <div>
                                        <p className="font-semibold">{track.name}</p>
                                        <p className="text-sm text-gray-400">{track.artist}</p>
                                    </div>
                                </div>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                    onClick={() => handleAddTrack(track)}
                                >
                                    Thêm
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Không tìm thấy bài hát nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetail;
