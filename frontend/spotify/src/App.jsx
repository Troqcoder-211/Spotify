import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './Pages/Admin/AdminDashboard';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from './features/auth/authSlice';

function App() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true); // Trạng thái loading
	// const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Lấy trạng thái xác thực từ store

	useEffect(() => {
		// Kiểm tra xác thực khi ứng dụng load lại
		dispatch(checkAuth()).then(() => setLoading(false)); // Khi xác thực xong, set loading = false
	}, [dispatch]);

	if (loading) {
		// Khi vẫn đang kiểm tra xác thực, có thể hiển thị spinner/loading state
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			{/* Route công khai */}
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/' element={<Home />} />

			{/* Route bảo vệ (chỉ truy cập khi đã đăng nhập) */}
			<Route
				path='/admin'
				element={<PrivateRoute element={<AdminDashboard />} />}
			/>

			{/* Route không tồn tại */}
			<Route path='*' element={<div>404 NOT FOUND</div>} />
		</Routes>
	);
}

export default App;
