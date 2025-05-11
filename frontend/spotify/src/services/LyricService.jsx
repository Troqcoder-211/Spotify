import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';
import axios from 'axios';

const LyricService = {
	// Lấy danh sách tất cả artist-album
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/lyrics/');
		});
	},

	// Lấy thông tin một artist-album theo ID
	getById: async (id) => {
		return await apiRequest(() => {
			return api.get(`/lyrics/${id}/`);
		});
	},

	// Lấy danh sách artist của một album
	getByTrackId: async (trackId) => {
		return await apiRequest(() => {
			return api.get(`/lyrics/track/${trackId}/`);
		});
	},

	getText: async (filePath) => {
		const res = await axios.get(filePath);
		if (res.status === 200) {
			return { success: true, data: res?.data };
		} else {
			console.error('API error: Lỗi khi lấy lời bài hát');
			return { success: false, error: 'Lỗi khi lấy lời bài hát' };
		}
	},
};

export default LyricService;
