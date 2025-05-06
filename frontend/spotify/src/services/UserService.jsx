import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const UserService = {
	checkUserStatus: async (id) => {
		return await apiRequest(() => {
			return api.get(`users/${id}/`);
		});
	},

	// Lấy danh sách tất cả user
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/users/');
		});
	},

	// Kích hoạt user
	active: async (id) => {
		return await apiRequest(() => {
			return api.put(`/users/${id}/active/`);
		});
	},
	// Tạm dừng user
	suspend: async (id) => {
		return await apiRequest(() => {
			return api.put(`/users/${id}/suspend/`);
		});
	},

	// Lấy thông tin một user theo ID
	getById: async (id) => {
		return await apiRequest(() => {
			return api.get(`/users/${id}/`);
		});
	},

	// Thêm user mới
	add: async (userData) => {
		const formData = new FormData();

		// Thêm các trường dữ liệu vào formData
		formData.append('username', userData.username);
		formData.append('email', userData.email);
		formData.append('full_name', userData.full_name || '');
		formData.append('date_of_birth', userData.date_of_birth || '');
		formData.append('account_type', userData.account_type || 'free');
		formData.append('country', userData.country || '');
		formData.append('password', userData.password);

		// Thêm file ảnh nếu có
		if (userData.profile_picture) {
			formData.append('profile_picture', userData.profile_picture);
		}

		return await apiRequest(() => {
			return api.post('/users/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		});
	},

	// Cập nhật user
	update: async (id, userData) => {
		const formData = new FormData();

		// Thêm các trường dữ liệu vào formData
		Object.keys(userData).forEach((key) => {
			if (key === 'profile_picture') {
				if (userData[key]) {
					formData.append(key, userData[key]);
				}
			} else {
				formData.append(key, userData[key]);
			}
		});

		return await apiRequest(() => {
			return api.put(`/users/${id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		});
	},

	// Xóa user
	delete: async (id) => {
		return await apiRequest(() => {
			return api.delete(`/users/${id}/`);
		});
	},

	// Tìm kiếm user
	search: async (query) => {
		return await apiRequest(() => {
			return api.get(`/users/?search=${query}`);
		});
	},
};

export default UserService;
