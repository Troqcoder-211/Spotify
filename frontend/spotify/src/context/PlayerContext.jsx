import { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/img/assets';

export const PlayerContext = createContext();

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A context provider for the player component. It provides
 * the state and actions of the player to the children components.
 *
 * @param {object} props
 * @param {object} props.children
 * @returns {JSX.Element}
 */
/******  0d0dc6ab-3472-4e1a-adf4-65f02cd2213b  *******/

const PlayerContextProvider = (props) => {
	const audioRef = useRef();
	const seekBg = useRef();
	const seekBar = useRef();

	const [track, setTrack] = useState(songsData[1]);
	// const [track, setTrack] = useState(null);
	const [playStatus, setPlayStatus] = useState(false);
	const [time, setTime] = useState({
		currentTime: {
			second: 0,
			minute: 0,
		},
		totalTime: {
			second: 0,
			minute: 0,
		},
	});

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
			setPlayStatus(true);
		}
	};

	const pause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setPlayStatus(false);
		}
	};

	const playWithId = (id) => {
		setTrack(songsData[id]);
		setPlayStatus(true);
	};

	const previous = () => {
		if (track.id === 0) return;
		setTrack(songsData[track.id - 1]);
		setPlayStatus(true);
	};

	const next = () => {
		if (track.id === songsData.length - 1) return;
		setTrack(songsData[track.id + 1]);
		setPlayStatus(true);
	};

	const seekSong = (e) => {
		if (audioRef.current && seekBg.current) {
			const offsetX = e.nativeEvent.offsetX;
			const bgWidth = seekBg.current.offsetWidth;
			const duration = audioRef.current.duration;

			audioRef.current.currentTime = (offsetX / bgWidth) * duration;
		}
	};

	// Cập nhật thời gian và thanh seek
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => {
			if (!audio.duration) return;

			const current = audio.currentTime;
			const duration = audio.duration;

			if (seekBar.current && seekBg.current) {
				seekBar.current.style.width = `${(current / duration) * 100}%`;
			}

			setTime({
				currentTime: {
					minute: Math.floor(current / 60),
					second: Math.floor(current % 60),
				},
				totalTime: {
					minute: Math.floor(duration / 60),
					second: Math.floor(duration % 60),
				},
			});
		};

		audio.ontimeupdate = handleTimeUpdate;

		return () => {
			audio.ontimeupdate = null;
		};
	}, [track]);

	// Tự động play khi track thay đổi nếu đang bật trạng thái play
	useEffect(() => {
		if (playStatus && audioRef.current) {
			audioRef.current.play();
		}
	}, [track]);

	// Tự động chuyển bài khi kết thúc
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.onended = () => {
			next();
		};

		return () => {
			audio.onended = null;
		};
	}, [track]);

	const contextValue = {
		audioRef,
		seekBg,
		seekBar,
		track,
		setTrack,
		playStatus,
		setPlayStatus,
		time,
		setTime,
		play,
		pause,
		playWithId,
		previous,
		next,
		seekSong,
	};
	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
