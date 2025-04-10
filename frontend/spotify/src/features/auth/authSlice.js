// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
// 🔁 Thunk: Gọi API đăng nhập
export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login/', credentials);
			return response.data;
		} catch (err) {
			return rejectWithValue(
				err.response?.data?.message || 'Đăng nhập thất bại'
			);
		}
	}
);

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data.user;
				state.token = action.payload.data.access;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.data;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
