import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const TrackService = {
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/tracks/');
		});
	},
	getById: async (id) => await apiRequest(() => api.get(`/tracks/${id}/`)),
	// ....
	create: async (newTrack) =>
		await apiRequest(() =>
			api.post('/tracks/', newTrack, {
				headers: {
					'Content-Type': 'multipart/form-data', // Có thể bỏ dòng này, axios sẽ tự set
				},
			})
		),
};

export default TrackService;
