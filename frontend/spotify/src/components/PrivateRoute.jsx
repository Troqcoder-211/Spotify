// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Giả sử bạn dùng Redux để quản lý trạng thái auth

const PrivateRoute = ({ element }) => {
	const { isAuthenticated } = useSelector((state) => state.auth); // Kiểm tra người dùng đã đăng nhập chưa

	if (!isAuthenticated) {
		// Nếu chưa đăng nhập, redirect về trang login
		return <Navigate to='/login' />;
	}

	return element; // Nếu đã đăng nhập, cho phép truy cập route
};

export default PrivateRoute;
