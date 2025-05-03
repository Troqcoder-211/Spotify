// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import TokenService from '../../services/TokenService';
// 🔁 Thunk: Gọi API đăng nhập
export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (data, thunkAPI) => {
		const { email, password } = data;
		const res = await AuthService.login(email, password);

		if (!res.success) {
			return thunkAPI.rejectWithValue(res.error);
		}
		const { access, refresh } = res.data;

		TokenService.setTokens(access, refresh);

		return res.data;
	}
);

// 🔁 Thunk: Gọi API đăng ký
export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (userData, thunkAPI) => {
		const { email, password, username } = userData;
		const res = await AuthService.register(email, password, username);
		if (!res.success) {
			return thunkAPI.rejectWithValue(res.error);
		}
		return res.data;
	}
);

const initialState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccountType: (state, action) => {
			if (state.user) {
				state.user.account_type = action.payload;
			}
		},
		logoutUser: (state) => {
			TokenService.clearTokens();
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = false;
			})
			.addCase(loginUser.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})

			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export default authSlice.reducer;
export const { setAccountType, logoutUser } = authSlice.actions;
