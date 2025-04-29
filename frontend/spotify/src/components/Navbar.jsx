import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/img/assets';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsMessenger } from 'react-icons/bs';
import { logoutUser } from '../features/auth/authSlice';
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	const dropdownRef = useRef(null); // Tạo ref cho dropdown

	const handleLogout = () => {
		dispatch(logoutUser());
		alert('Đăng xuất thành công');
		navigate('/login');
		setDropdownOpen(false);
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
					{isAuthenticated ? (
						<div className='relative' ref={dropdownRef}>
							<button
								onClick={toggleDropdown}
								className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center'
							>
								{user?.full_name?.[0] || 'U'}
							</button>

							{dropdownOpen && (
								<div className='absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in-down'>
									{/* <button
										onClick={() => {
											// navigate('/profile');
											setDropdownOpen(false);
										}}
										className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-150 rounded-b-lg'
									>
										Trang cá nhân
									</button> */}
									<button
										onClick={handleLogout}
										className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-150 rounded-t-lg'
									>
										Đăng xuất
									</button>
								</div>
							)}
						</div>
					) : (
						<div className='flex space-x-2  p-2 rounded-lg'>
							<button
								onClick={() => navigate('/register')}
								className='text-gray-500 font-bold px-4 py-2 hover:transform hover:scale-105'
							>
								Đăng ký
							</button>
							<button
								onClick={() => navigate('/login')}
								className='bg-white text-black font-bold px-4 py-2 rounded-full hover:transform hover:scale-105'
							>
								Đăng nhập
							</button>
						</div>
					)}
					<div onClick={() => navigate(`/chat`)}>
						<BsMessenger className='w-6 h-6 hover:text-gray-300 hover:transform hover:scale-105 cursor-pointer' />
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
