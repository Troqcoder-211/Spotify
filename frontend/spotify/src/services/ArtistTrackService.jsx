import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const ArtistTrackService = {
	getArtistsByTrack: async (trackId) => {
		return await apiRequest(() => {
			return api.get(`/artist-tracks/track/${trackId}/`);
		});
	},
	// Lấy danh sách tên nghệ sĩ của một track
	getArtistsByTrackId: async (trackId) => {
		try {
			const response = await api.get(`/artist-tracks/track/${trackId}/`);
			if (response.data.success) {
				// Lấy danh sách tên nghệ sĩ từ response
				const artists = response.data.data.map(
					(artistTrack) => artistTrack.artist
				);
				console.log(artists);
				return {
					success: true,
					data: artists,
				};
			}
			return {
				success: false,
				error: response.data.message || 'Không thể lấy danh sách nghệ sĩ',
			};
		} catch (error) {
			console.error('Lỗi khi lấy danh sách nghệ sĩ:', error);
			return {
				success: false,
				error: error.response?.data?.message || error.message,
			};
		}
	},

	// Lấy danh sách track của một artist
	getByArtist: async (artistId) => {
		return await apiRequest(() => {
			return api.get(`/artist-tracks/artist/${artistId}/`);
		});
	},

	// Thêm artist vào track
	add: async (artistTrackData) => {
		return await apiRequest(() => {
			return api.post('/artist-tracks/', artistTrackData);
		});
	},

	// Cập nhật thông tin artist-track
	update: async (id, artistTrackData) => {
		return await apiRequest(() => {
			return api.put(`/artist-tracks/${id}/`, artistTrackData);
		});
	},

	// Xóa artist khỏi track
	delete: async (id) => {
		return await apiRequest(() => {
			return api.delete(`/artist-tracks/${id}/`);
		});
	},
};

export default ArtistTrackService;
