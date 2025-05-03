import React from 'react';
import { useDispatch } from 'react-redux';
import { addTrack } from '../features/player/playerSlice';

const SongItem = ({ props }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(addTrack(props));
	};

	return (
		<div
			onClick={handleClick}
			className='w-[180px] h-[260px] p-3 rounded-lg bg-[#1e1e1e] cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center mr-3'
		>
			<img
				className='w-[160px] h-[160px] rounded object-cover'
				src={props.img_path || import.meta.env.VITE_IMG_DEFAULT}
				alt={props.title}
			/>
			<div className='mt-3 text-center w-full'>
				<p className='font-bold text-white text-[16px] truncate'>
					{props.title}
				</p>
				<p className='text-slate-400 text-[13px] truncate'>
					{props.desc || '[Nghệ sĩ A, Nghệ sĩ B]'}
				</p>
			</div>
		</div>
	);
};

export default SongItem;
