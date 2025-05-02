import { createContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	const audioRef = useRef();
	const seekBg = useRef();
	const seekBar = useRef();

	const [track, setTrack] = useState(null);
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

	// Hàm phát nhạc
	const play = () => {
		if (audioRef.current && track) {
			audioRef.current.play();
			setPlayStatus(true);
		}
	};

	// Hàm dừng nhạc
	const pause = () => {
		if (audioRef.current && track) {
			audioRef.current.pause();
			setPlayStatus(false);
		}
	};

	// Hàm phát bài hát với tên file
	const playWithFile = (track) => {
		if (!isAuthenticated) {
			alert('Hãy đăng nhập để nghe nhạc');
			return;
		}
		setTrack(track); // Chỉ lưu tên file trong track
		setPlayStatus(true);

		// Đảm bảo rằng audio mới phát với URL đúng
		if (audioRef.current) {
			audioRef.current.src = track.file_path;
			audioRef.current.play();
		}
	};

	// Chuyển bài hát trước đó
	const previous = () => {
		// Cập nhật logic nếu cần thiết
	};

	// Chuyển bài hát tiếp theo
	const next = () => {
		// Cập nhật logic nếu cần thiết
	};

	// Tìm kiếm vị trí trong bài hát
	const seekSong = (e) => {
		if (audioRef.current && seekBg.current && track) {
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

			if (seekBar.current && seekBg.current && track) {
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
		if (playStatus && audioRef.current && track) {
			audioRef.current.play();
		}
	}, [track]);

	// Tự động chuyển bài khi kết thúc
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.onended = () => {
			next(); // Chuyển sang bài tiếp theo khi kết thúc
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
		playWithFile,
		previous,
		next,
		seekSong,
	};

	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
			<audio
				ref={audioRef}
				src={track?.file}
				controls
				hidden
				preload='metadata'
			></audio>
		</PlayerContext.Provider>
	);
};

export default PlayerContextProvider;
