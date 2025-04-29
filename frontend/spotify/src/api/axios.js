// src/api/axios.js
import axios from 'axios';
import TokenService from '../services/TokenService';

const baseURL = import.meta.env.VITE_BASE_URL; // với Vite

const api = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: true, // 💥 Cho phép gửi cookie kèm request
	headers: {
		'Content-Type': 'application/json',
	},
});

// 🟡 Gắn token tự động (nếu có trong localStorage)
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
// Xử lí refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

// 🔴 Xử lý lỗi chung (tùy chỉnh theo dự án)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 403 &&
			!originalRequest._retry &&
			TokenService.getRefreshToken()
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await axios.post(`${baseURL}/auth/refresh-token`, {
					refresh: TokenService.getRefreshToken(),
				});

				const { access, refresh } = response.data;

				TokenService.setTokens(access, refresh);
				api.defaults.headers.common['Authorization'] = 'Bearer ' + access;
				processQueue(null, access);

				return api(originalRequest);
			} catch (err) {
				processQueue(err, null);
				// Nếu lỗi luôn cả refresh, logout hoặc redirect
				TokenService.clearTokens();
				window.location.href = '/login';
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default api;
