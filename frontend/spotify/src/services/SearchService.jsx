import api from '../api/axios';
import { apiRequest } from '../api/ApiRequest';

const SearchService = {
	search: async (query) => {
		return await apiRequest(() => {
			return api.get(`/search/?query=${query}`);
		});
	},
};

export default SearchService;
