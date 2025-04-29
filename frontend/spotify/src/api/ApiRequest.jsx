export const apiRequest = async (axiosCall) => {
	try {
		const res = await axiosCall();
		console.log('>>>>>>>>>>>>>.res: ', res);
		return { success: true, data: res?.data?.data };
	} catch (error) {
		console.log('>>>>>>>>>>>>>.error: ', error);
		const message = error?.response?.data?.message || 'Request failed';
		console.error('API error:', message);
		return { success: false, error: message };
	}
};
