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
			return rejectWithValue(err.response?.data);
		}
	}
);

// 🔁 Thunk: Gọi API đăng ký
export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/register/', userData);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response?.data);
		}
	}
);

export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const token = state.auth?.user?.token;

		if (token) {
			// giả sử user đã login trước đó
			return state.auth.user;
		} else {
			return thunkAPI.rejectWithValue('No token found');
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
				state.error = action.payload.success;
			})

			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.success;
			})

			.addCase(checkAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload.success;
				state.user = null;
				state.loading = false;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
