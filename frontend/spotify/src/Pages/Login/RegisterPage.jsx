import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await dispatch(registerUser({ email, password, username }));

			toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
			navigate('/login');
		} catch (err) {
			toast.warning('Đăng ký thất bại! Vui lòng thử lại.');
			console.error(err);
		}
	};

	const { isAuthenticated, loading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className='flex items-center justify-center min-h-screen bg-[#292929]'>
			<form
				onSubmit={handleRegister}
				className='bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96'
			>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					Tạo tài khoản Spotify
				</h2>
				<input
					type='text'
					placeholder='Tên người dùng'
					className='w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='email'
					placeholder='Email'
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
				<input
					type='password'
					placeholder='Xác nhận mật khẩu'
					className='w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button
					type='submit'
					className='cursor-pointer w-full bg-green-500 text-black font-semibold py-2 rounded-full mb-4 border-2 border-transparent hover:border-white'
				>
					{loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
				</button>

				<p className='text-gray-400 text-sm text-center'>
					Đã có tài khoản?
					<span
						onClick={() => navigate('/login')}
						className='inline cursor-pointer hover:text-green-400 text-white'
					>
						Đăng nhập tại đây
					</span>
				</p>
			</form>
		</div>
	);
}
