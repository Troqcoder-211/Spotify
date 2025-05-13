import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../features/player/playerSlice';
import { assets } from '../assets/img/assets';
import LikeTrackService from '../services/LikeTrackService';
import { toast } from 'react-toastify';
import _ from 'lodash';
const SongItem = ({ props, likedSongs, setLikedSongs }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const handleClick = () => {
		dispatch(addTrack(props));
	};
	const handleLikeTrack = async (e, track_id) => {
		e.stopPropagation();
		const res = await LikeTrackService.userLikeTrack(user.id, track_id);
		if (res.success) {
			toast.success('Liked!');
			const likedSongsClone = _.cloneDeep(likedSongs);
			likedSongsClone.push(res.data);
			console.log('>>nghi like', likedSongsClone);
			setLikedSongs([...likedSongsClone]);
		}
	};
	const handleUnLikeTrack = async (e, track_id) => {
		e.stopPropagation();
		const res = await LikeTrackService.unlikeTrack(user.id, track_id);
		if (res.success) {
			toast.success('Unliked!');
			const likedSongsClone = _.cloneDeep(likedSongs);
			const rs = likedSongsClone.filter((s) => s.track !== track_id);
			console.log('>>nghi xoas', rs);
			setLikedSongs([...rs]);
		}
	};

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
					{props.artists.map((a) => a?.name).join(',') ||
						'[Nghệ sĩ A, Nghệ sĩ B]'}
				</p>
			</div>
			<div className='text-left w-full mt-2'>
				{likedSongs &&
				likedSongs.length > 0 &&
				likedSongs.some((s) => s.track === props.track_id) ? (
					<img
						src={assets.heart_e}
						alt=''
						onClick={(e) => handleUnLikeTrack(e, props.track_id)}
					/>
				) : (
					<img
						src={assets.heart}
						alt=''
						onClick={(e) => handleLikeTrack(e, props.track_id)}
					/>
				)}
			</div>
		</div>
	);
};

export default SongItem;
