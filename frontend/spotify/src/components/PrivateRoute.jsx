import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, allowedRoles = [] }) => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
		return <Navigate to='/unauthorized' />; // Hoặc về trang 403
	}

	return element;
};

export default PrivateRoute;
