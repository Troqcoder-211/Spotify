import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const TrackService = {
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/tracks/');
		});
	},
	// ....
};

export default TrackService;
