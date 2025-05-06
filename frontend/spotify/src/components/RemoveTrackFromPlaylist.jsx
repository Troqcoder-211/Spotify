import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RemoveTrackFromPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [trackId, setTrackId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/playlists/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setPlaylists(response.data);
            } catch (error) {
                setMessage('Không thể tải playlists.');
            }
        };
        fetchPlaylists();
    }, []);

    const handleRemoveTrack = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete('http://localhost:8888/api/playlists/remove-track/', {
                data: {
                    playlist: selectedPlaylist,
                    track: trackId,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setMessage('Track đã được xóa khỏi playlist!');
        } catch (error) {
            setMessage('Xóa track thất bại!');
        }
    };

    return (
        <div className="remove-track-container">
            <h2>Xóa Track khỏi Playlist</h2>
            <form onSubmit={handleRemoveTrack}>
                <select
                    value={selectedPlaylist}
                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                    className="select-playlist"
                    required
                >
                    <option value="">Chọn Playlist</option>
                    {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.playlist_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="ID Track"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="track-id-input"
                    required
                />
                <button type="submit" className="btn-submit">Xóa Track</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveTrackFromPlaylist;
