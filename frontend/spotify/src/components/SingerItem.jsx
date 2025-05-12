import React from 'react';
import { useNavigate } from 'react-router-dom';

const SingerItem = ({ props, index }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/artist/${props.artist_id}`);
	};

	return (
		<div
			onClick={handleClick}
			key={index}
			className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center'
		>
			<img
				src={props.profile_picture}
				alt={props.name}
				className='w-34 h-34 rounded-full object-cover '
			/>
			<p className='text-white mt-2 font-semibold'>{props.name}</p>
			<p className='text-gray-400 text-sm'>Nghệ sĩ</p>
		</div>
	);
};

export default SingerItem;
