import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/img/assets';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
const Navbar = () => {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	const dispatch = useDispatch();
	const dropdownRef = useRef(null); // Tạo ref cho dropdown
	const handleLogout = () => {
		// Xử lý đăng xuất ở đây
		// Xóa thông tin khỏi Redux store
		dispatch(logout());

		// Xóa thông tin khỏi localStorage hoặc sessionStorage
		localStorage.removeItem('persist:auth'); // hoặc sessionStorage.removeItem('persist:auth')

		// Redirect về trang login hoặc trang chính
		navigate('/login'); // Dùng react-router-dom để chuyển hướng
	};

	// Hàm để đóng dropdown khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false); // Đóng dropdown khi click ngoài
			}
		};

		document.addEventListener('mousedown', handleClickOutside); // Lắng nghe sự kiện click

		return () => {
			document.removeEventListener('mousedown', handleClickOutside); // Dọn dẹp sự kiện khi component bị hủy
		};
	}, []);
	return (
		<>
			<div className='w-full flex justify-between items-center font-semibold '>
				<div className='flex items-center gap-2'>
					<img
						onClick={() => navigate(-1)}
						className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
						src={assets.arrow_left}
						alt=''
					/>
					<img
						onClick={() => navigate(1)}
						className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
						src={assets.arrow_right}
						alt=''
					/>
				</div>
				<div className='flex items-center gap-4'>
					<p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
						Explore Premium
					</p>
					{/* <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer ">
            Install App
          </p> */}
					<div className='relative'>
						{isAuthenticated ? (
							<div className='relative'>
								{/* Biểu tượng avatar */}
								<div
									onClick={toggleDropdown}
									className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'
								>
									{user.username.split('')[0].toUpperCase()}
								</div>

								{/* Dropdown menu */}
								{dropdownOpen && (
									<ul
										ref={dropdownRef}
										className='absolute right-0 mt-2 bg-white shadow-lg  p-[3px] min-w-[180px] '
									>
										<li className='px-4 py-2 text-gray-700 hover:bg-gray-200 w-full cursor-pointer'>
											Thông tin cá nhân
										</li>
										<li className='px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer'>
											Cài đặt
										</li>
										<li
											className='px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer border-t border-gray-300'
											onClick={handleLogout}
										>
											Đăng xuất
										</li>
									</ul>
								)}
							</div>
						) : (
							<div className='flex space-x-2  p-2 rounded-lg'>
								<button
									onClick={() => navigate('/register')}
									className='cursor-pointer text-gray-500 font-bold px-4 py-2 hover:transform hover:scale-105'
								>
									Đăng ký
								</button>
								<button
									onClick={() => navigate('/login')}
									className=' cursor-pointer bg-white text-black font-bold px-4 py-2 rounded-full hover:transform hover:scale-105'
								>
									Đăng nhập
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='flex items-center gap-2 mt-4'>
				{/* <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p> */}
				<p className='bg-black  px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
				{/* <p className="bg-black  px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p> */}
			</div>
		</>
	);
};

export default Navbar;
