import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';
import TokenService from '../services/TokenService';

const AuthService = {
	login: async (email, password) => {
		return await apiRequest(() => {
			return api.post('/auth/login/', { email, password })
			.then(response => {
				// Sau khi login thành công, lưu token vào sessionStorage
				TokenService.setTokens(response.data.access, response.data.refresh);
				return response;
			  });
		});
	},
	logout: async () => {
		TokenService.clearTokens();
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
