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


	// Cập nhật track
	update: async (id, trackData) => {
		const formData = new FormData();
		
		// Xử lý các trường đặc biệt
		const specialFields = {
			album: trackData.album === null ? 'none' : trackData.album,
			track_number: trackData.track_number === null ? undefined : trackData.track_number,
			duration: trackData.duration,
			popularity: trackData.popularity || 0,
			is_active: trackData.is_active !== undefined ? trackData.is_active : true
		};

		// Thêm các trường vào formData
		Object.entries(trackData).forEach(([key, value]) => {
			if (key === 'file_path' || key === 'img_path') {
				if (value) {
					formData.append(key, value);
				}
			} else if (key in specialFields) {
				const specialValue = specialFields[key];
				if (specialValue !== undefined) {
					formData.append(key, String(specialValue));
				}
			} else if (value !== null && value !== undefined) {
				formData.append(key, value);
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
	},

	// Thêm track mới
	add: async (trackData) => {
		const formData = new FormData();

		// Log dữ liệu đầu vào
		console.log('Dữ liệu đầu vào:', trackData);
		console.log('File nhạc:', trackData.file_path);
		console.log('File ảnh:', trackData.img_path);

		// Thêm các trường text
		formData.append('title', trackData.title);
		formData.append('duration', trackData.duration);
		formData.append('artist_id', trackData.artist_id);
		formData.append('album', trackData.album === "none" ? "none" : trackData.album);
		formData.append('track_number', trackData.track_number || '');
		formData.append('popularity', trackData.popularity || 0);
		formData.append('preview_url', trackData.preview_url || '');
		formData.append('is_active', trackData.is_active !== undefined ? trackData.is_active : true);

		// Thêm file nhạc
		if (trackData.file_path) {
			console.log('Thêm file nhạc:', trackData.file_path.name);
			formData.append('file_path', trackData.file_path, trackData.file_path.name);
		}

		// Thêm file ảnh
		if (trackData.img_path) {
			console.log('Thêm file ảnh:', trackData.img_path.name);
			formData.append('img_path', trackData.img_path, trackData.img_path.name);
		}

		// Log formData để debug
		console.log('Dữ liệu gửi đi:');
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value instanceof File ? value.name : value);
		}

		try {
			const response = await api.post('/tracks/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Accept': 'application/json'
				}
			});
			return {
				success: true,
				data: response.data,
				message: 'Thành công'
			};
		} catch (error) {
			console.error('Lỗi khi gửi request:', error);
			return {
				success: false,
				error: error.response?.data?.message || error.message,
				status: error.response?.status
			};
		}
	}
};

export default TrackService;
