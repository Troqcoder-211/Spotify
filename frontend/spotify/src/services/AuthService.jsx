import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const AuthService = {
	login: async (email, password) => {
		return await apiRequest(() => {
			return api.post('/auth/login/', { email, password });
		});
	},
	logout: async () => {
		return { success: true };
	},
	register: async (email, password, username) => {
		return await apiRequest(() => {
			return api.post('/auth/register/', { email, password, username });
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

export default AuthService;
