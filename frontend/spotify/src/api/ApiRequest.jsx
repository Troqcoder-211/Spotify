export const apiRequest = async (axiosCall) => {
	try {
		const res = await axiosCall();
		return { success: true, data: res?.data?.data, message: res?.data?.message};
	} catch (error) {
		const message = error?.response?.data?.message || 'Request failed';
		console.error('API error:', message);
		return { success: false, error: message };
	}
};
