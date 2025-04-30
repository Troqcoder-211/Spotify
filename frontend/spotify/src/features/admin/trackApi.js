import api from '../../api/axios';

export const addTrack = async (trackData) => {
    try {
        const formData = new FormData();
        
        // Thêm các trường dữ liệu vào FormData
        formData.append('title', trackData.title);
        formData.append('artist', trackData.artist);
        formData.append('duration', trackData.duration);
        if (trackData.album) {
            formData.append('album', trackData.album);
        }
        
        // Thêm file ảnh nếu có
        if (trackData.image) {
            formData.append('image', trackData.image);
        }
        
        // Thêm file audio
        if (trackData.audio) {
            formData.append('audio', trackData.audio);
        }

        const response = await api.post('/tracks/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Có lỗi xảy ra khi thêm bài hát' };
    }
};

export const getAllTracks = async () => {
    try {
        const response = await api.get('/tracks/');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Có lỗi xảy ra khi lấy danh sách bài hát' };
    }
};

export const deleteTrack = async (trackId) => {
    try {
        const response = await api.delete(`/tracks/${trackId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Có lỗi xảy ra khi xóa bài hát' };
    }
};

export const updateTrack = async (trackId, trackData) => {
    try {
        const formData = new FormData();
        
        // Thêm các trường dữ liệu vào FormData
        if (trackData.title) formData.append('title', trackData.title);
        if (trackData.artist) formData.append('artist', trackData.artist);
        if (trackData.duration) formData.append('duration', trackData.duration);
        if (trackData.album) formData.append('album', trackData.album);
        
        // Thêm file ảnh nếu có
        if (trackData.image) {
            formData.append('image', trackData.image);
        }
        
        // Thêm file audio nếu có
        if (trackData.audio) {
            formData.append('audio', trackData.audio);
        }

        const response = await api.put(`/tracks/${trackId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Có lỗi xảy ra khi cập nhật bài hát' };
    }
}; 