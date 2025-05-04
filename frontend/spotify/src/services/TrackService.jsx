import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const TrackService = {
	// Lấy tất cả track
	getAll: async () => {
		return await apiRequest(() => api.get('/tracks/'));
	},

	getRecommended: async (limit) => {
		return await apiRequest(() =>
			api.get(`/tracks/recommended/?limit=${limit}`)
		);
	},

	// Lấy track theo id
	getById: async (id) => {
		return await apiRequest(() => api.get(`/tracks/${id}/`));
	},

	// Lấy track theo album id
	getByAlbum: async (albumId) => {
		return await apiRequest(() => api.get(`/tracks/album/${albumId}/`));
	},

	// Thêm track mới
	add: async (formData) => {
		// Log formData để debug
		for (let [key, value] of formData.entries()) {
			console.log(
				`${key}:`,
				value instanceof File ? `${value.name} (${value.size} bytes)` : value
			);
		}
		try {
			const response = await api.post('/tracks/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				timeout: 100000,
				maxContentLength: Infinity,
				maxBodyLength: Infinity,
			});

			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error('Lỗi khi thêm track:', error);
			return {
				success: false,
				error: error.response?.data?.message || error.message,
				status: error.response?.status,
			};
		}
	},

	// Cập nhật track
	update: async (id, trackData) => {
		const formData = new FormData();

		// Thêm các trường cần update
		Object.keys(trackData).forEach((key) => {
			formData.append(key, trackData[key]);
		});

		return await apiRequest(() =>
			api.put(`/tracks/${id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		);
	},

	// Xóa track
	delete: async (id) => {
		return await apiRequest(() => api.delete(`/tracks/${id}/`));
	},
};

export default TrackService;
