import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
			<div className='bg-white shadow-md rounded-lg p-10 max-w-md text-center'>
				<h1 className='text-6xl font-bold text-red-500 mb-4'>403</h1>
				<h2 className='text-2xl font-semibold mb-2'>Không có quyền truy cập</h2>
				<p className='text-gray-600 mb-6'>
					Bạn không được phép truy cập vào trang này. Vui lòng liên hệ quản trị
					viên nếu bạn nghĩ đây là nhầm lẫn.
				</p>
				<Link
					to='/'
					className='inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition'
				>
					Quay về trang chủ
				</Link>
			</div>
		</div>
	);
};

export default Unauthorized;
