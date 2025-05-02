import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = () => {
	const [played, setPlayed] = useState(0); // Vị trí đang phát
	const [duration, setDuration] = useState(0); // Tổng thời gian bài hát

	// Hàm cập nhật khi người dùng di chuyển thanh trượt
	const handleSeek = (event) => {
		const seekTime = event.target.value; // Thời gian cần tua
		player.seekTo(seekTime, 'seconds'); // Tua đến vị trí cần thiết
	};

	// Cập nhật tiến trình khi bài hát đang phát
	const handleProgress = (state) => {
		setPlayed(state.played * duration); // Cập nhật vị trí phát
	};

	// Cập nhật tổng thời gian của bài hát
	const handleDuration = (duration) => {
		setDuration(duration);
	};

	let player = null; // Tham chiếu đến ReactPlayer

	return (
		<div>
			<ReactPlayer
				ref={(ref) => {
					player = ref;
				}}
				url='http://localhost:8888/api/stream/1xj558pvss.mp3/'
				playing={true}
				controls={true}
				width='100%'
				height='50px'
				onProgress={handleProgress}
				onDuration={handleDuration}
			/>
			<div>
				<input
					hidden
					type='range'
					min='0'
					max={duration}
					value={played}
					onChange={handleSeek}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
