import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const AlbumService = {
    // Lấy danh sách tất cả album
    getAll: async () => {
        return await apiRequest(() => {
            return api.get('/albums/');
        });
    },

    // Lấy thông tin một album theo ID
    getById: async (id) => {
        return await apiRequest(() => {
            return api.get(`/albums/${id}/`);
        });
    },

    // Lấy danh sách album của một artist
    getByArtist: async (artistId) => {
        return await apiRequest(() => {
            return api.get(`/albums/artist/${artistId}/`);
        });
    },

    // Thêm album mới
    add: async (formData) => {
        // Log formData để debug
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
        }

        return await apiRequest(() => {
            return api.post('/albums/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        });
    },

    // Cập nhật album
    update: async (id, albumData) => {
        const formData = new FormData();
        
        // Thêm các trường dữ liệu vào formData
        Object.keys(albumData).forEach(key => {
            if (key === 'cover_img_url') {
                if (albumData[key]) {
                    formData.append(key, albumData[key]);
                }
            } else if (key === 'artists') {
                formData.append(key, JSON.stringify(albumData[key]));
            } else {
                formData.append(key, albumData[key]);
            }
        });

        // Log formData để debug
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
        }

        return await apiRequest(() => {
            return api.put(`/albums/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        });
    },

    // Xóa album
    delete: async (id) => {
        return await apiRequest(() => {
            return api.delete(`/albums/${id}/`);
        });
    },

    // Tìm kiếm album
    search: async (query) => {
        return await apiRequest(() => {
            return api.get(`/albums/?search=${query}`);
        });
    }
};

export default AlbumService; 