import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage thay vì sessionStorage

const persistConfig = {
	key: 'auth', // key này phải khớp với tên reducer bạn muốn persist
	storage: storage, // 👈 Dùng localStorage ở đây
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
