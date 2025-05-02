import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const ArtistService = {
    // Lấy danh sách tất cả artists
    getAll: async () => {
        return await apiRequest(() => {
            return api.get('/artists/');
        });
    },

    // Lấy thông tin một artist theo ID
    getById: async (id) => {
        return await apiRequest(() => {
            return api.get(`/artists/${id}/`);
        });
    },

    // Thêm artist mới
    add: async (artistData) => {
        const formData = new FormData();
        
        // Thêm các trường dữ liệu vào formData
        Object.keys(artistData).forEach(key => {
            if (key === 'profile_picture') {
                if (artistData[key]) {
                    formData.append(key, artistData[key]);
                }
            } else {
                formData.append(key, artistData[key]);
            }
        });

        return await apiRequest(() => {
            return api.post('/artists/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        });
    },

    // Cập nhật artist
    update: async (id, artistData) => {
        const formData = new FormData();
        
        // Thêm các trường dữ liệu vào formData
        Object.keys(artistData).forEach(key => {
            if (key === 'profile_picture') {
                if (artistData[key]) {
                    formData.append(key, artistData[key]);
                }
            } else {
                formData.append(key, artistData[key]);
            }
        });

        return await apiRequest(() => {
            return api.put(`/artists/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        });
    },

    // Xóa artist
    delete: async (id) => {
        return await apiRequest(() => {
            return api.delete(`/artists/${id}/`);
        });
    },

    // Tìm kiếm artist
    search: async (query) => {
        return await apiRequest(() => {
            return api.get(`/artists/?search=${query}`);
        });
    }
};

export default ArtistService; 