import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrack } from '../features/player/playerSlice';
import ArtistTrackService from '../services/ArtistTrackService';
import { toast } from 'react-toastify';

const SongItem = ({ props }) => {
	const dispatch = useDispatch();
	const [artists, setArtists] = useState([]);
	const handleClick = () => {
		dispatch(addTrack(props));
	};

	const handleGetArtists = async () => {
		const res = await ArtistTrackService.getArtistsByTrack(props.track_id);
		if (res.success) {
			setArtists(res.data);
		} else {
			setArtists([]);
			toast.error(res.error);
		}
	};
	useEffect(() => {
		handleGetArtists();
	}, []);

	return (
		<div
			onClick={handleClick}
			className='min-w-[200px] w-[200px] h-[260px] transition-all duration-150 p-3 rounded-lg bg-[#1e1e1e] cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center mr-3'
		>
			<img
				className='w-full h-[160px] rounded object-cover'
				src={props.img_path || import.meta.env.VITE_IMG_DEFAULT}
				alt={props.title}
			/>
			<div className='mt-3 text-left w-full'>
				<p className='font-bold text-white text-[16px] truncate'>
					{props.title
						.toLowerCase()
						.split(' ')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}
				</p>
				<p className='text-slate-400 text-[13px] truncate text-left'>
					{artists.map((a) => a?.artist?.name).join(',') ||
						'[Nghệ sĩ A, Nghệ sĩ B]'}
				</p>
			</div>
		</div>
	);
};

export default SongItem;
