import { StrictMode } from 'react';
// import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContext.jsx';

// 🟢 Thêm Redux Provider
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.js'; // điều chỉnh đường dẫn nếu bạn đặt store ở nơi khác
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<PlayerContextProvider>
						<App />
					</PlayerContextProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</StrictMode>
);
