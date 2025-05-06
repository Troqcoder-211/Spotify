import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit'; // để lấy kết quả từ asyncThunk
import { toast } from 'react-toastify';

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, isAuthenticated } = useSelector((state) => state.auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		if (email === 'admin') setEmail((prev) => (prev += '@gmail.com'));
		try {
			const resultAction = await dispatch(loginUser({ email, password }));
			const data = unwrapResult(resultAction);

			// ✅ Hiển thị toast thành công
			toast.success(`Xin chào ${data?.user?.email || 'người dùng'}!`);
			if (data.user.role === 'admin') {
				navigate('/admin');
			} else {
				navigate('/');
			}
			// 👉 Chuyển hướng nếu cần, ví dụ:
		} catch (err) {
			toast.warning(err || 'Đăng nhập thất bại'); // Hiển thị thông báo lỗ
		}
	};

	// 👉 Redirect nếu đã đăng nhập
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<form
			onSubmit={handleLogin}
			className='flex items-center justify-center min-h-screen bg-[#292929]'
		>
			<div className='bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96'>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					Đăng nhập vào Spotify
				</h2>

				<div className='flex items-center my-4'>
					<hr className='flex-grow border-gray-700' />
					<span className='px-2 text-gray-400'>hoặc</span>
					<hr className='flex-grow border-gray-700' />
				</div>
				<input
					type={email === 'admin' ? 'text' : 'email'}
					placeholder='Email hoặc tên người dùng'
					className='w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Mật khẩu'
					className='w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-green-500 text-black font-semibold py-2 rounded-full mb-4 border-2 border-transparent hover:border-white cursor-pointer'
				>
					{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
				</button>

				<p className='text-gray-400 text-sm text-center'>
					Chưa có tài khoản?{' '}
					<span
						onClick={() => navigate('/register')}
						className='inline cursor-pointer hover:text-green-400 text-white'
					>
						Đăng ký tại đây
					</span>
				</p>
				<p className='text-gray-400 text-sm text-center'>
					<span
						onClick={() => navigate('/')}
						className='inline underline cursor-pointer text-green-600 hover:text-green-400 text-whit text-[16px]'
					>
						Quay về trang chủ
					</span>
				</p>
			</div>
		</form>
	);
}
