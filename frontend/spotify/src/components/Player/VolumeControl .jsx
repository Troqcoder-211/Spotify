import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/img/assets'; // Đảm bảo bạn có assets.volume_icon
import { useDispatch, useSelector } from 'react-redux';
import { setIsMute, setVolume } from '../../features/player/playerSlice';

const VolumeControl = () => {
	const { volume, isMute } = useSelector((state) => state.player);
	const [mute, setMute] = useState(true);
	const dispatch = useDispatch();

	// Hàm thay đổi âm lượng khi kéo thanh
	const handleVolumeChange = (event) => {
		dispatch(setVolume(event.target.value));
	};
	const handleMute = () => {
		if (mute) {
			setMute(false);
			dispatch(setIsMute(false));
		} else {
			setMute(true);
			dispatch(setIsMute(true));
		}
	};

	useEffect(() => {
		setMute(isMute);
	}, [isMute]);
	return (
		<div className='flex items-center gap-2'>
			{/* Biểu tượng âm lượng */}
			{mute ? (
				<img
					onClick={handleMute}
					className='w-[16px] cursor-pointer'
					src={assets.mute}
					alt='mute'
				/>
			) : (
				<img
					onClick={handleMute}
					className='w-[16px] cursor-pointer'
					src={assets.volume_icon}
					alt='volume'
				/>
			)}

			{/* Thanh chỉnh âm lượng */}
			<input
				type='range'
				min='0'
				max='100'
				value={volume}
				onChange={handleVolumeChange}
				className='w-30 bg-[#4d4d4d] transition-all duration-300 rounded-full h-1 cursor-pointer volume'
			/>
		</div>
	);
};

export default VolumeControl;
