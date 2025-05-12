import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './Pages/404/NotFoundPage';
import MusicPlayer from './components/MusicPlayer';
import PaymentSuccess from './components/PaymentSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Unauthorized from './components/Unauthorized ';
import PlaylistDetail from './components/PlaylistDetail';
import MainLayout from './components/MainLayout';
import PlayerContextProvider from './context/PlayerContext';

function App() {
	return (
		<PlayerContextProvider>
			<Routes>
				{/* Route công khai */}
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/music' element={<MusicPlayer />} />
				<Route path='/unauthorized' element={<Unauthorized />} />
				<Route path='/payment-success' element={<PaymentSuccess />} />

				{/* Route sử dụng layout chính */}
				<Route path='/*' element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path='playlist/:id' element={<PlaylistDetail />} />
				</Route>

				{/* Route bảo vệ */}
				<Route
					path='/admin'
					element={
						<PrivateRoute
							element={<AdminDashboard />}
							allowedRoles={['admin']}
						/>
					}
				/>

				{/* Route không tồn tại */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</PlayerContextProvider>
	);
}

export default App;
