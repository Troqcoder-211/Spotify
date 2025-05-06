import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const ArtistService = {
	// Lấy danh sách tất cả artists
	getAll: async () => {
		return await apiRequest(() => {
			return api.get('/artists/');
		});
	},

	// Lấy thông tin một artist theo ID
	getById: async (id) => {
		return await apiRequest(() => {
			return api.get(`/artists/${id}/`);
		});
	},

	// Thêm artist mới
	add: async (artistData) => {
		const formData = new FormData();

		// Thêm các trường dữ liệu vào formData
		Object.keys(artistData).forEach((key) => {
			if (key === 'profile_picture') {
				if (artistData[key]) {
					formData.append(key, artistData[key]);
				}
			} else {
				formData.append(key, artistData[key]);
			}
		});

		return await apiRequest(() => {
			return api.post('/artists/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		});
	},

	// Cập nhật artist
	update: async (id, artistData) => {
		const formData = new FormData();

		// Thêm các trường dữ liệu vào formData
		Object.keys(artistData).forEach((key) => {
			if (key === 'profile_picture') {
				if (artistData[key]) {
					formData.append(key, artistData[key]);
				}
			} else {
				formData.append(key, artistData[key]);
			}
		});

		return await apiRequest(() => {
			return api.put(`/artists/${id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		});
	},

	// Xóa artist
	delete: async (id) => {
		return await apiRequest(() => {
			return api.delete(`/artists/${id}/`);
		});
	},

	// Tìm kiếm artist
	search: async (query) => {
		return await apiRequest(() => {
			return api.get(`/artists/?search=${query}`);
		});
	},

	// Lấy tổng số bài hát của một artist
	// Lấy danh sách artist với tổng số bài hát và album
	getAllWithStats: async () => {
		try {
			// Lấy danh sách artists
			const artistsResponse = await apiRequest(() => {
				return api.get('/artists/');
			});
			if (!artistsResponse.success) {
				return artistsResponse;
			}

			// Lấy thông tin chi tiết cho từng artist
			const artistsWithStats = await Promise.all(
				artistsResponse.data.map(async (artist) => {
					// Lấy tracks của artist
					const tracksResponse = await apiRequest(() => {
						return api.get(`/artist-tracks/artist/${artist.artist_id}/`);
					});

					// Lấy albums của artist
					const albumsResponse = await apiRequest(() => {
						return api.get(`/artist-albums/artist/${artist.artist_id}/`);
					});

					return {
						...artist,
						total_songs: tracksResponse.success
							? tracksResponse.data.length
							: 0,
						total_albums: albumsResponse.success
							? albumsResponse.data.length
							: 0,
					};
				})
			);

			return {
				success: true,
				data: artistsWithStats,
			};
		} catch (error) {
			console.error('Lỗi khi lấy thống kê artist:', error);
			return {
				success: false,
				error: error.response?.data?.message || error.message,
			};
		}
	},
};

export default ArtistService;
