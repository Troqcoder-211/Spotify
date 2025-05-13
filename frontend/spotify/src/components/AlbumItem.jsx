import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ props }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/album/${props.album_id}`)}
			className='min-w-[200px] w-[200px] h-[260px] p-2 px-3 rounded cursor-pointer bg-[#1e1e1e] hover:bg-[#ffffff26] transition-all duration-300'
		>
			<img
				className=' w-full h-[180px]  rounded '
				src={props.cover_img_url}
				alt=''
			/>
			<p className='font-bold mt-2 mb-1 text-[18px] text-center'>
				{props.title}
			</p>
		</div>
	);
};

export default AlbumItem;
