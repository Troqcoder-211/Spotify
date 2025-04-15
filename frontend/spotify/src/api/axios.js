// src/api/axios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL; // với Vite

const api = axios.create({
	baseURL,
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

// 🔴 Xử lý lỗi chung (tùy chỉnh theo dự án)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn('Token hết hạn hoặc không hợp lệ!');
			// có thể dispatch logout ở đây nếu cần
		}
		return Promise.reject(error);
	}
);

export default api;
