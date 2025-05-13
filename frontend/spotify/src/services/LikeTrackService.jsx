import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';
import TokenService from '../services/TokenService';

const LikeTrackService = {
	getByUser: async (userId) => {
		return await apiRequest(() => {
			return api.get(`/like-track/user/${userId}/`);
		});
	},
	userLikeTrack: async (userId, trackId) => {
		return await apiRequest(() => {
			return api.post(`/like-track/`, {
				user: userId,
				track: trackId,
			});
		});
	},
	unlikeTrack: async (userId, trackId) => {
		return await apiRequest(() => {
			return api.delete(`/like-track/user/${userId}/track/${trackId}/`);
		});
	},
	// resetPassword: async (accountUsername) => {
	// 	return apiRequest(() => {
	// 		return api.post(`/auth/reset-password`, {
	// 			username: accountUsername,
	// 		});
	// 	});
	// },
};

export default LikeTrackService;
