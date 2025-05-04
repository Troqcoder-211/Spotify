import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const ArtistAlbumService = {
    // Lấy danh sách tất cả artist-album
    getAll: async () => {
        return await apiRequest(() => {
            return api.get('/artist-albums/');
        });
    },

    // Lấy thông tin một artist-album theo ID
    getById: async (id) => {
        return await apiRequest(() => {
            return api.get(`/artist-albums/${id}/`);
        });
    },

    // Lấy danh sách artist của một album
    getArtistsByAlbumId: async (albumId) => {
        return await apiRequest(() => {
            return api.get(`/artist-albums/album/${albumId}/`);
        });
    },

    // Lấy danh sách album của một artist
    getAlbumsByArtistId: async (artistId) => {
        return await apiRequest(() => {
            return api.get(`/artist-albums/artist/${artistId}/`);
        });
    },

    // Thêm artist-album mới
    add: async (artistAlbumData) => {
        return await apiRequest(() => {
            return api.post('/artist-albums/', artistAlbumData);
        });
    },

    // Cập nhật artist-album
    update: async (id, artistAlbumData) => {
        return await apiRequest(() => {
            return api.put(`/artist-albums/${id}/`, artistAlbumData);
        });
    },

    // Xóa artist-album
    delete: async (id) => {
        return await apiRequest(() => {
            return api.delete(`/artist-albums/${id}/`);
        });
    }
};

export default ArtistAlbumService;

