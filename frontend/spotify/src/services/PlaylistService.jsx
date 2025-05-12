import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";
import axios from 'axios';

// 👉 Đặt token ở ngoài để dùng chung cho tất cả hàm
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3MDMxMjcwLCJpYXQiOjE3NDcwMjc2NzAsImp0aSI6ImJmNGQzMWYwMTA5YzRiZWNiNGI1ZmU3ODBmMmY0ZTE3IiwidXNlcl9pZCI6MX0.F84vCo2eoB0QzLAkB8I6Avo5FY-jasJevNfZL1tJCiM"
const authHeaders = {
  Authorization: `Bearer ${token}`,
};

const PlaylistService = {
  getAllPlayLists: async () => {
    return await apiRequest(() => {
      return api.get("/playlists/", {
        headers: authHeaders,
      });
    });
  },

  createPlaylist: async (newPlaylist) => {
    try {
      const response = await axios.post('http://localhost:8000/api/playlists/', newPlaylist, {
        headers: authHeaders,
      });

      const normalizedData = {
        ...response.data.data,
        id: response.data.data.playlist_id,
      };

      return {
        success: response.data.success,
        message: response.data.message,
        data: normalizedData,
      };
    } catch (error) {
      console.error('Error creating playlist:', error);
      return { success: false };
    }
  },

  getPlaylistDetail: async (id) => {
    if (!id) {
      console.error('ID không hợp lệ');
      return { success: false };
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/playlists/${id}/`, {
        headers: authHeaders,
      });

      const data = response.data;

      if (data.success && data.data) {
        return {
          success: true,
          data: {
            ...data.data,
            id: data.data.playlist_id,
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết playlist:', error);
      return { success: false };
    }
  },

  updatePlaylist: async (id, updatedData) => {
    if (!id) {
      console.error('ID không hợp lệ');
      return { success: false };
    }
    try {
      const response = await axios.put(`http://localhost:8000/api/playlists/${id}/`, updatedData, {
        headers: authHeaders,
      });

      const data = response.data;

      if (data.success && data.data) {
        return {
          success: true,
          data: {
            ...data.data,
            id: data.data.playlist_id,
          }
        };
      }

      return { success: false };
    } catch (error) {
      console.error('Lỗi khi cập nhật playlist:', error);
      return { success: false };
    }
  },

  searchTracks: async (query) => {
    try {
      const response = await axios.get('http://localhost:8000/api/tracks/search-by-title/', {
        params: { title: query },
        headers: authHeaders,
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm bài hát:', error);
      return { success: false };
    }
  },

  getTracksByPlaylistId: async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/playlists/get-all-tracks/${playlistId}/`, {
        headers: authHeaders,
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách track của playlist:', error);
      return { success: false };
    }
  },

  // Thêm track vào playlist
  addTrackToPlaylist: async (playlistId, trackId) => {
    try {
      console.log(trackId);
      const response = await axios.post(
        `http://localhost:8000/api/playlists/add-track/${playlistId}/`,
        { track_id: trackId },
        { headers: authHeaders }
      );

      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Lỗi khi thêm track vào playlist:', error);
      return { success: false };
    }
  },

  removeTrackFromPlaylist: async (playlistId, trackId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/playlists/${playlistId}/remove-track/${trackId}/`,
        { headers: authHeaders }
      );

      if (response.status === 204 || response.data.success) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Lỗi khi xoá track khỏi playlist:', error);
      return { success: false };
    }
  },

};

export default PlaylistService;
