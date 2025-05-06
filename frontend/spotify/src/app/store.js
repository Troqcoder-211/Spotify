import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // Sử dụng localStorage thay vì sessionStorage
import playerReducer from '../features/player/playerSlice';

const authPersistConfig = {
	key: 'auth', // Lưu auth vào 'auth' key
	storage: sessionStorage,
};

const playerPersistConfig = {
	key: 'player', // Lưu player vào 'player' key
	storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedPlayerReducer = persistReducer(
	playerPersistConfig,
	playerReducer
);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		player: persistedPlayerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
