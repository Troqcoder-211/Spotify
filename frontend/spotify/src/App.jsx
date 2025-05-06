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

function App() {
	return (
		<>
			<Routes>
				{/* Route công khai */}
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/music' element={<MusicPlayer />} />
				<Route path='/unauthorized' element={<Unauthorized />} />
				<Route path='/*' element={<Home />} />

				{/* Route bảo vệ (chỉ truy cập khi đã đăng nhập) */}
				<Route
					path='/admin'
					element={
						<PrivateRoute
							element={<AdminDashboard />}
							allowedRoles={['admin']}
						/>
					}
				/>

				{/* Route cho trang callback thanh toán */}
				{/* <Route path="/payment-callback" element={<PaymentCallback />} /> */}

				<Route path='/payment-success' element={<PaymentSuccess />} />

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
				// "light" | "dark" | "colored"
			/>
		</>
	);
}

export default App;
