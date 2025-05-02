import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const TrackService = {
	// Lấy danh sách tất cả tracks
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/tracks/');
		});
	},

	// Lấy thông tin một track theo ID
	getById: async (id) => {
		return await apiRequest(() => {
			return api.get(`/tracks/${id}/`);
		});
	},

	// Thêm track mới
	add: async (trackData) => {
		const formData = new FormData();
		
		// Thêm các trường dữ liệu vào formData
		Object.keys(trackData).forEach(key => {
			if (key === 'file_path') {
				if (trackData[key]) {
					formData.append(key, trackData[key]);
				}
			} else if (key === 'album' && trackData[key] === null) {
				formData.append(key, 'none');
			} else {
				formData.append(key, trackData[key]);
			}
		});
		
		return await apiRequest(() => {
			return api.post('/tracks/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		});
	},

	// Cập nhật track
	update: async (id, trackData) => {
		const formData = new FormData();
		
		// Thêm các trường dữ liệu vào formData
		Object.keys(trackData).forEach(key => {
			if (key === 'file_path') {
				if (trackData[key]) {
					formData.append(key, trackData[key]);
				}
			} else if (key === 'album' && trackData[key] === null) {
				formData.append(key, 'none');
			} else {
				formData.append(key, trackData[key]);
			}
		});

		return await apiRequest(() => {
			return api.put(`/tracks/${id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		});
	},

	// Xóa track
	delete: async (id) => {
		return await apiRequest(() => {
			return api.delete(`/tracks/${id}/`);
		});
	},

	// Tìm kiếm tracks
	search: async (query) => {
		return await apiRequest(() => {
			return api.get('/tracks/search/', {
				params: { q: query }
			});
		});
	},

	// Lấy tracks theo album
	getByAlbum: async (albumId) => {
		return await apiRequest(() => {
			return api.get(`/tracks/album/${albumId}/`);
		});
	},

	// Lấy tracks theo artist
	getByArtist: async (artistId) => {
		return await apiRequest(() => {
			return api.get(`/tracks/artist/${artistId}/`);
		});
	},

	// Cập nhật trạng thái active của track
	updateStatus: async (id, isActive) => {
		return await apiRequest(() => {
			return api.patch(`/tracks/${id}/status/`, {
				is_active: isActive
			});
		});
	}
};

export default TrackService;
