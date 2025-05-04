import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Modal() {
	const [isOpen, setIsOpen] = useState(true);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	// Hàm xử lý khi người dùng click ra ngoài modal
	const handleCloseModal = (e) => {
		// Kiểm tra xem click có phải bên ngoài modal không
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	if (isAuthenticated) return;

	return (
		isOpen && (
			<div
				onClick={handleCloseModal}
				className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] opacity-0.3 bg-opacity-50'
			>
				<div className='bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full text-white  relative'>
					<div className='flex flex-col items-center'>
						<img
							src='https://cdn2.tuoitre.vn/zoom/700_700/471584752817336320/2024/11/25/hieuthuhai-17325007908741114459723-33-0-748-1366-crop-17325008883382060585225.jpg'
							alt='Promotion'
							className='w-48 h-48 rounded-lg object-cover'
						/>
						<h2 className='text-xl font-bold mt-4 text-center'>
							Bắt đầu nghe bằng tài khoản Spotify Free
						</h2>
						<button
							onClick={() => {
								setIsOpen(false);
								navigate('/register');
							}}
							className='bg-green-500 text-white font-semibold px-6 py-2 rounded-full mt-4 hover:tranform hover:scale-105 cursor-pointer'
						>
							Đăng ký miễn phí
						</button>

						<p className='text-gray-400 text-sm mt-4'>
							Bạn đã có tài khoản?{' '}
							<span
								onClick={() => navigate('/login')}
								className='text-white font-semibold cursor-pointer hover:text-green-500'
							>
								Đăng nhập
							</span>
						</p>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className='absolute bottom-20 left-1/2 transform translate-y-[120px] -translate-x-1/2 text-white text-xl hover:scale-110 transition duration-300 ease-in-out cursor-pointer'
					>
						Đóng
					</button>
				</div>
			</div>
		)
	);
}
