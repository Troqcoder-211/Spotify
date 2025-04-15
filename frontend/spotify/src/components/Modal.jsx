import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Modal({ isAuthenticated }) {
	const [isOpen, setIsOpen] = useState(true);
	const modalRef = useRef(null); // Tham chiếu đến modal
	const navigate = useNavigate();

	// Hàm kiểm tra click ngoài modal
	const handleClickOutside = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			setIsOpen(false); // Nếu click ngoài modal, ẩn modal
		}
	};

	// Lắng nghe sự kiện click khi component mount và dọn dẹp khi component unmount
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup listener khi component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		isOpen && (
			<div className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50'>
				<div
					ref={modalRef} // Gán ref cho modal
					className='bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full text-white relative'
				>
					<div className='flex flex-col items-center'>
						<img
							src='https://cdn2.tuoitre.vn/zoom/700_700/471584752817336320/2024/11/25/hieuthuhai-17325007908741114459723-33-0-748-1366-crop-17325008883382060585225.jpg'
							alt='Promotion'
							className='w-48 h-48 rounded-lg object-cover'
						/>
						<h2 className='text-2xl font-bold mt-4 text-center'>
							Bắt đầu nghe bằng tài khoản Spotify Free
						</h2>
						<button className='cursor-pointer bg-green-500 text-white font-semibold px-6 py-2 rounded-full mt-4 hover:tranform hover:scale-105 duration-300 ease-in-out'>
							Đăng ký miễn phí
						</button>
						<button className='cursor-pointer border border-white text-white font-semibold px-6 py-2 rounded-full mt-2 hover:tranform hover:scale-105 duration-300 ease-in-out'>
							Tải ứng dụng xuống
						</button>
						{!isAuthenticated && (
							<p className='text-gray-400 text-sm mt-4'>
								Bạn đã có tài khoản?{' '}
								<span
									onClick={() => navigate('/login')}
									className='text-white font-semibold cursor-pointer hover:text-green-500'
								>
									Đăng nhập
								</span>
							</p>
						)}
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className='cursor-pointer mt-5 w-full text-center text-white text-xl hover:opacity-80 transition duration-300 ease-in-out'
					>
						Đóng
					</button>
				</div>
			</div>
		)
	);
}
