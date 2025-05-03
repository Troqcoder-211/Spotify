import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/img/assets';
import { useSelector, useDispatch } from 'react-redux';
import {
	play,
	pause,
	nextTrack,
	previousTrack,
	setCurrentTime,
	setRepeatMode,
	setShuffle,
} from '../features/player/playerSlice';
import QueueCard from './Queue/QueueCard';

const Player = () => {
	const dispatch = useDispatch();
	const {
		playStatus,
		currentTime,
		totalTime,
		repeatMode,
		playlist,
		shuffle,
		currentTrackIndex,
	} = useSelector((state) => state.player);

	const audioRef = useRef(null); // reference to the audio element

	const [isDragging, setIsDragging] = useState(false);

	const formatTime = (time) =>
		`${time.minute}:${time.second < 10 ? `0${time.second}` : time.second}`;

	const handleSeek = (e) => {
		const bar = e.currentTarget;
		const clickX = e.clientX - bar.getBoundingClientRect().left;
		const width = bar.clientWidth;
		const percent = clickX / width;

		const totalSeconds = totalTime.minute * 60 + totalTime.second;
		const seekToSeconds = Math.floor(percent * totalSeconds);

		if (audioRef.current && playlist[currentTrackIndex]) {
			audioRef.current.currentTime = seekToSeconds;
			dispatch(
				setCurrentTime({
					minute: Math.floor(seekToSeconds / 60),
					second: seekToSeconds % 60,
				})
			);
		}
	};

	useEffect(() => {
		dispatch(pause());
	}, []);

	useEffect(() => {
		if (!audioRef.current || !playlist[currentTrackIndex]) return;

		const audio = audioRef.current;
		const newTime = currentTime.minute * 60 + currentTime.second;
		// Chỉ cập nhật nếu khác (tránh loop)
		if (Math.floor(audio.currentTime) !== newTime) {
			audio.currentTime = newTime;
		}

		// Chỉ phát khi đã có bài và trạng thái là đang phát
		if (playStatus) {
			const playPromise = audio.play();

			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.warn('Không thể phát audio:', error);
				});
			}
		} else {
			audio.pause();
		}
	}, [playStatus, currentTrackIndex, playlist, currentTime]);

	// Lắng nghe sự kiện onTimeUpdate để cập nhật tến trình bài hát
	useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement) return;

		const handleEnded = () => {
			switch (repeatMode) {
				case 'one':
					dispatch(setCurrentTime({ minute: 0, second: 0 }));
					return;
				case 'all':
					dispatch(nextTrack({ isRepeat: true }));
					return;
				default:
					dispatch(nextTrack({ isRepeat: false }));
					return;
			}
		};
		const handleTimeUpdate = () => {
			const currentSec = Math.floor(audioElement.currentTime);

			audioElement.addEventListener('ended', handleEnded);

			const minute = Math.floor(currentSec / 60);
			const second = currentSec % 60;
			dispatch(setCurrentTime({ minute, second }));
		};

		audioElement.addEventListener('timeupdate', handleTimeUpdate);

		return () => {
			audioElement.removeEventListener('timeupdate', handleTimeUpdate);
			audioElement.removeEventListener('ended', handleEnded);
		};
	}, [dispatch, totalTime, repeatMode]);

	// progress bar
	const handleMouseDown = (e) => {
		setIsDragging(true);
		handleSeek(e); // Ensure we update the progress when the user starts dragging
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (isDragging) {
			handleSeek(e);
		}
	};

	const [showQueue, setShowQueue] = useState(false);

	const handleShowQueue = () => {
		setShowQueue(!showQueue);
	};
	return (
		<div className='flex h-[10%] flex-col justify-center'>
			<div className='h-[100%] bg-black flex justify-between items-center text-white px-4 '>
				{/* Image and text */}
				<div className='hidden lg:flex items-center gap-4 '>
					<img
						className='w-16'
						src={
							playlist[currentTrackIndex]?.img_path ||
							import.meta.env.VITE_IMG_DEFAULT
						}
						alt='anhbaihat'
					/>
					<div>
						<p className='font-bold '>
							{playlist[currentTrackIndex]?.title || 'Unknown'}
						</p>
						<p className='text-[13px] text-[#b3b3b3] font-bold'>
							{playlist[currentTrackIndex]?.artists || '[nghệ sĩ1, nghệ sĩ2]'}
						</p>
					</div>
				</div>
				{/* AUDIO */}
				{/* Audio Player */}
				<audio
					ref={audioRef}
					src={playlist[currentTrackIndex]?.file_path}
					hidden
					controls
					preload='metadata'
				/>
				{/* controls  */}
				<div className='flex flex-col items-center gap-3 m-auto'>
					<div className='flex gap-y-4 gap-x-7 items-center'>
						<img
							onClick={() => dispatch(setShuffle())}
							className='w-5 cursor-pointer '
							src={shuffle ? assets.shuffle_e_icon : assets.shuffle_icon}
							alt='shuffle'
						/>
						<img
							onClick={() => dispatch(previousTrack())}
							className='w-5 cursor-pointer '
							src={assets.prev_icon}
							alt='prev'
						/>

						{/* play and pause button */}

						{playStatus ? (
							<div
								onClick={() => dispatch(pause())}
								className='h-12 w-12 bg-[#00c951] rounded-[50%] flex items-center justify-center  cursor-pointer select-none '
							>
								<img
									className='w-6 cursor-pointer '
									src={assets.pause_icon}
									alt='pause'
								/>
							</div>
						) : (
							<div
								onClick={() => dispatch(play())}
								className='h-12 w-12 bg-[#00c951] rounded-[50%] flex items-center justify-center cursor-pointer select-none '
							>
								<img
									className='w-5 cursor-pointer '
									src={assets.play_icon}
									alt='play'
								/>
							</div>
						)}

						<img
							onClick={() => dispatch(nextTrack({ isRepeat: false }))}
							className='w-5 cursor-pointer '
							src={assets.next_icon}
							alt='next'
						/>
						<img
							onClick={() => dispatch(setRepeatMode())}
							className='w-5 cursor-pointer '
							src={
								repeatMode === 'off'
									? assets.loop_icon
									: repeatMode === 'one'
									? assets.loop_e_o_icon
									: assets.loop_e_icon
							}
							alt='loop'
						/>
					</div>
					<div className='flex items-center gap-5'>
						<p>{formatTime(currentTime)}</p>
						<div
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
							onMouseLeave={handleMouseUp}
							className=' group w-[60vw] max-w-[800px] bg-[#4d4d4d] rounded-full cursor-pointer relative h-[4px] expand-hitbox '
						>
							<div
								style={{
									width: `${
										((currentTime.minute * 60 + currentTime.second) /
											(totalTime.minute * 60 + totalTime.second || 1)) *
										100
									}%`,
								}}
								className='h-full bg-[#fff] rounded-full absolute top-0 left-0 group-hover:bg-[#1db954]'
							>
								<div className='hidden group-hover:block w-4 h-4 bg-white rounded-full absolute -right-1 top-1/2 -translate-y-1/2'></div>
							</div>
						</div>
						<p>{formatTime(totalTime)}</p>
					</div>
				</div>
				<div className='hidden lg:flex items-center gap-y-2 gap-x-4 opacity-75'>
					<img className='w-[16px] ' src={assets.play_icon} alt='play' />
					{/* <img className='w-[16px] ' src={assets.mic_icon} alt='play' /> */}
					<img
						onClick={handleShowQueue}
						className='w-[16px] cursor-pointer '
						src={showQueue ? assets.queue_e_icon : assets.queue_icon}
						alt='play'
					/>
					{/* <img className='w-[16px] ' src={assets.speaker_icon} alt='play' /> */}
					<img className='w-[16px] ' src={assets.volume_icon} alt='play' />
					<div className='w-30 bg-slate-50 h-[4px] rounded '></div>
					{/* <img className='w-[16px] ' src={assets.mini_player_icon} alt='play' /> */}
					<img className='w-[16px] ' src={assets.zoom_icon} alt='play' />
				</div>
			</div>
			{showQueue && (
				<div className='absolute right-0 top-0 z-50 h-[90%]'>
					<QueueCard onClose={() => setShowQueue(false)} />
				</div>
			)}
		</div>
	);
};

export default Player;
