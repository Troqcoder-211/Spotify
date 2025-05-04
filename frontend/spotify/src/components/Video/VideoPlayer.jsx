// src/components/VideoPlayer.jsx
import React, { useState } from 'react';
import { assets } from '../../assets/img/assets';

const VideoPlayer = ({ videoRef, videoSrc, title = 'Đang phát video' }) => {
	const [isVisible, setIsVisible] = useState(true);

	const togglePlayer = () => {
		setIsVisible(!isVisible);
	};

	if (!isVisible) {
		// Khi bị ẩn hoàn toàn
		return (
			<button
				onClick={togglePlayer}
				className='absolute top-6 right-4 z-50 p-4 bg-[#ffff] rounded-[50%] transition-all duration-300 hover:bg-[#333] cursor-pointer'
				title='Hiện trình phát video'
			>
				<img src={assets.show_vid} alt='Hiện' />
			</button>
		);
	}

	return (
		<div className='absolute top-0 right-0 w-[460px] h-[90%] bg-zinc-900 z-51 text-white flex flex-col'>
			{/* Header */}
			<div className='h-[10%] px-4 flex items-center justify-start bg-[#1f1f1f1f] border-b border-gray-700 mb-3'>
				<button
					onClick={togglePlayer}
					className='text-sm px-3 mr-2 ml-[-12px] py-1 transition-all duration-300  hover:bg-[#333333] rounded cursor-pointer'
				>
					<img src={assets.hide_vid} alt='Ẩn' />
				</button>
				<h2 className='text-lg font-semibold'>Trình phát video</h2>
			</div>

			{/* Body */}
			<div className='flex flex-col px-4 py-2 gap-2 overflow-auto'>
				<video
					ref={videoRef}
					src={videoSrc}
					controls
					className='w-full h-[300px] object-cover rounded-md custom-video'
				/>
				<h3 className='text-md font-medium'>{title}</h3>
			</div>
		</div>
	);
};

export default VideoPlayer;
