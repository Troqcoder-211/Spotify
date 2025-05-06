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
	nextTrackNoRepeat,
} from '../features/player/playerSlice';
import QueueCard from './Queue/QueueCard';
import VideoPlayer from './Video/VideoPlayer';
import ProgressBar from './ProgressBar';
import Controls from './Controls';

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

	const { user } = useSelector((state) => state.auth);

	const isSeekingRef = useRef(false);

	const audioRef = useRef(null);
	const videoRef = useRef(null);

	const mediaRef = playlist[currentTrackIndex]?.video_path
		? videoRef
		: audioRef;

	const [showQueue, setShowQueue] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isChangeTrack, setIsChangeTrack] = useState(false);
	const [audioSrc, setAudioSrc] = useState('');
	const [isAds, setIsAds] = useState(false);

	const formatTime = (time) => {
		if (!time) return '0:00';
		const { minute, second } = time;
		return `${minute}:${second < 10 ? `0${second}` : second}`;
	};

	useEffect(() => {
		dispatch(pause());
	}, []);

	// Xử lý khi thay đổi playStatus
	useEffect(() => {
		if (!mediaRef.current || !playlist[currentTrackIndex]) return;

		const audio = mediaRef.current;

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
	}, [playStatus]);

	useEffect(() => {
		if (!mediaRef.current || !playlist[currentTrackIndex]) return;

		const audio = mediaRef.current;
		const newTime = currentTime.minute * 60 + currentTime.second;

		if (isSeekingRef.current || isChangeTrack) {
			audio.currentTime = newTime;
			isSeekingRef.current = false;
			setIsChangeTrack(false);
		}
	}, [currentTime]);

	useEffect(() => {
		const mediaElement = mediaRef.current;
		if (!mediaElement) return;

		const handleEnded = () => {
			const song = playlist[currentTrackIndex];
			if (!song?.preview_url) {
				setAudioSrc(song.file_path);
				const onAudioCanPlay = () => {
					if (playStatus) {
						mediaElement.play().catch((error) => {
							console.warn('Không thể phát bài mới:', error);
						});
					} else {
						mediaElement.pause();
					}

					// Xoá sự kiện sau khi đã phát nhạc để tránh gọi lại nhiều lần
					mediaElement.removeEventListener('canplaythrough', onAudioCanPlay);
				};
				mediaElement.addEventListener('canplaythrough', onAudioCanPlay);

				return;
			}
			switch (repeatMode) {
				case 'one':
					if (playStatus) {
						mediaElement.play();
					}
					dispatch(setCurrentTime({ minute: 0, second: 0 }));

					return;
				case 'all':
					if (playStatus) {
						mediaElement.play();
					}
					dispatch(nextTrack());
					return;
				default:
					dispatch(nextTrackNoRepeat());
					return;
			}
		};

		const handleTimeUpdate = () => {
			if (isSeekingRef.current) return;

			const currentSec = Math.floor(mediaElement.currentTime);

			const minute = Math.floor(currentSec / 60);
			const second = currentSec % 60;
			dispatch(setCurrentTime({ minute, second }));
		};

		mediaElement.addEventListener('ended', handleEnded);

		mediaElement.addEventListener('timeupdate', handleTimeUpdate);

		return () => {
			mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
			mediaElement.removeEventListener('ended', handleEnded);
		};
	}, [repeatMode]);

	useEffect(() => {
		if (!mediaRef.current || !playlist[currentTrackIndex]) return;

		const song = playlist[currentTrackIndex];
		if (user.account_type === 'free' && song.preview_url !== '') {
			console.log('>>> premium', song);
			setIsAds(true);
			setAudioSrc(song.preview_url);
		} else {
			console.log('>>> free', song);
			setIsAds(false);
			setAudioSrc(song.file_path);
		}

		const audio = mediaRef.current;
		audio.currentTime = 0;
		dispatch(setCurrentTime({ minute: 0, second: 0 }));

		// Đảm bảo bài hát đã tải xong mới bắt đầu phát
		const onAudioCanPlay = () => {
			if (playStatus) {
				audio.play().catch((error) => {
					console.warn('Không thể phát bài mới:', error);
				});
			} else {
				audio.pause();
			}

			// Xoá sự kiện sau khi đã phát nhạc để tránh gọi lại nhiều lần
			audio.removeEventListener('canplaythrough', onAudioCanPlay);
		};

		// Gắn sự kiện canplaythrough khi audio src thay đổi
		audio.addEventListener('canplaythrough', onAudioCanPlay);

		// Dọn dẹp sự kiện khi component unmount hoặc khi thay đổi track
		return () => {
			audio.removeEventListener('canplaythrough', onAudioCanPlay);
		};
	}, [currentTrackIndex, playlist]);

	//
	const handleSeek = (e) => {
		const bar = e.currentTarget;
		const clickX = e.clientX - bar.getBoundingClientRect().left;
		const width = bar.clientWidth;
		const percent = clickX / width;

		const totalSeconds = totalTime.minute * 60 + totalTime.second;
		const seekToSeconds = Math.floor(percent * totalSeconds);

		if (mediaRef.current && playlist[currentTrackIndex]) {
			mediaRef.current.currentTime = seekToSeconds;
			isSeekingRef.current = true;
			setIsChangeTrack(false);
			dispatch(
				setCurrentTime({
					minute: Math.floor(seekToSeconds / 60),
					second: seekToSeconds % 60,
				})
			);
		}
	};

	// progress bar
	const handleMouseDown = (e) => {
		setIsDragging(true);
		handleSeek(e);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (isDragging) {
			handleSeek(e);
		}
	};

	const handleTogglePlay = () => {
		if (playStatus) {
			dispatch(pause());
		} else {
			dispatch(play());
		}
	};

	const handlePrev = () => {
		setIsChangeTrack(true);
		dispatch(previousTrack());
	};

	const handleNext = () => {
		setIsChangeTrack(true);
		dispatch(nextTrack());
	};

	const handleShuffle = () => {
		dispatch(setShuffle());
	};

	const handleRepeat = () => {
		dispatch(setRepeatMode());
	};

	const handleShowQueue = () => {
		setShowQueue(!showQueue);
	};

	//
	return (
		<div className='flex h-[10%] flex-col justify-center'>
			<div className='h-[100%] bg-black flex justify-between items-center text-white px-4 '>
				{/* Image and text */}
				<div className='hidden w-[375px] lg:flex items-center gap-4 '>
					<img
						className='w-16'
						src={
							playlist[currentTrackIndex]?.img_path ||
							import.meta.env.VITE_IMG_DEFAULT
						}
						alt='anhbaihat'
					/>
					<div className='flex flex-col max-w-[250px]'>
						<p className='font-bold break-words leading-snug'>
							{playlist[currentTrackIndex]?.title || 'Unknown'}
						</p>
						<p className='text-[13px] text-[#b3b3b3] font-bold break-words leading-snug'>
							{playlist[currentTrackIndex]?.artists
								.map((a) => a?.name)
								.join(',') || '[nghệ sĩ1, nghệ sĩ2]'}
						</p>
					</div>
				</div>

				{/* AUDIO / VIDEO */}
				{playlist[currentTrackIndex]?.video_path ? (
					<VideoPlayer
						videoRef={videoRef}
						videoSrc={playlist[currentTrackIndex].video_path}
					/>
				) : (
					<audio
						ref={audioRef}
						// src={playlist[currentTrackIndex]?.file_path}
						src={audioSrc}
						hidden
						// controls
						preload='metadata'
					/>
				)}

				{/* CONTROLS  */}
				<div className='flex flex-col items-center gap-3 m-auto'>
					<Controls
						isPlaying={playStatus}
						repeatMode={repeatMode}
						isShuffle={shuffle}
						togglePlay={handleTogglePlay}
						handlePrev={handlePrev}
						handleNext={handleNext}
						handleShuffle={handleShuffle}
						handleRepeat={handleRepeat}
						disabled={isAds}
					/>
					{/* ProgressBar		 */}
					<ProgressBar
						currentTime={currentTime}
						totalTime={totalTime}
						onSeekStart={handleMouseDown}
						onSeekMove={handleMouseMove}
						onSeekEnd={handleMouseUp}
						formatTime={formatTime}
						disabled={isAds}
					/>
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
