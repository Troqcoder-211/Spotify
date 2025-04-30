const TOKEN_KEYS = {
	access: 'accessToken',
	refresh: 'refreshToken',
};

const TokenService = {
	getAccessToken: () => sessionStorage.getItem(TOKEN_KEYS.access),
	getRefreshToken: () => sessionStorage.getItem(TOKEN_KEYS.refresh),

	setTokens: (accessToken, refreshToken) => {
		sessionStorage.setItem(TOKEN_KEYS.access, accessToken);
		sessionStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
	},

	clearTokens: () => {
		sessionStorage.removeItem(TOKEN_KEYS.access);
		sessionStorage.removeItem(TOKEN_KEYS.refresh);
		localStorage.removeItem(TOKEN_KEYS.access); // Thêm dòng này
		localStorage.removeItem(TOKEN_KEYS.refresh); // Thêm dòng này
	},
};

export default TokenService;
