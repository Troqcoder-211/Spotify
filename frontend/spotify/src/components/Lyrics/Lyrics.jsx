import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import LyricService from '../../services/LyricService';
import { setCurrentTime } from '../../features/player/playerSlice';

// Hàm chia lời bài hát thành các đoạn tối đa 10 từ mỗi đoạn

const Lyrics = () => {
	const [lyrics, setLyrics] = useState([]);
	const [currentLine, setCurrentLine] = useState(0);
	const { playlist, currentTrackIndex, currentTime } = useSelector(
		(state) => state.player
	);

	const getLyric = async () => {
		const res = await LyricService.getByTrackId(
			playlist[currentTrackIndex].track_id
		);

		if (res.success) {
			const filePath = res.data.file_path;

			const res1 = await LyricService.getText(filePath);
			const rs = parseLRC(res1.data);

			if (res1.success) {
				setLyrics(rs);
			} else {
				setLyrics([]);
			}
		}
	};

	// useEffect(() => {

	// }, [currentTime]);

	function parseLRC(lrcText) {
		const lines = lrcText.split('\n');
		const lyrics = [];

		for (let line of lines) {
			const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?]\s*(.*)/);
			if (match) {
				const [, min, sec, msec = '0', text] = match;
				const timeInSeconds =
					parseInt(min) * 60 + parseInt(sec) + parseInt(msec) / 1000;
				lyrics.push({ time: timeInSeconds, text });
			}
		}

		return lyrics;
	}
	const dispatch = useDispatch();

	const handleChange = (line, i) => {
		if (playlist[currentTrackIndex]) {
			dispatch(
				setCurrentTime({
					minute: Math.floor(line.time / 60),
					second: Math.floor(line.time % 60),
					manualSeek: true,
				})
			);
		}
		setCurrentLine(i); // cập nhật dòng hiện tại
	};
	useEffect(() => {
		getLyric();
	}, [currentTrackIndex]);

	const currentTimeInSeconds = currentTime.minute * 60 + currentTime.second;

	useEffect(() => {
		// Nếu đang manualSeek thì bỏ qua để tránh nhảy loạn
		if (currentTime.manualSeek) return;

		const index = lyrics.findIndex((line, i) => {
			const nextLine = lyrics[i + 1];
			// Nếu là dòng cuối hoặc đã qua dòng này nhưng chưa đến dòng tiếp theo
			if (!nextLine) return currentTimeInSeconds >= line.time;
			return (
				currentTimeInSeconds >= line.time &&
				currentTimeInSeconds < nextLine.time
			);
		});

		if (index !== -1 && index !== currentLine) {
			setCurrentLine(index);
		}
	}, [currentTimeInSeconds, lyrics]);

	const lyricRefs = useRef([]);
	lyricRefs.current = lyrics.map(
		(_, i) => lyricRefs.current[i] ?? React.createRef()
	);
	useEffect(() => {
		if (lyricRefs.current[currentLine]) {
			lyricRefs.current[currentLine].current.scrollIntoView({
				behavior: 'smooth',
				block: 'center', // Canh giữa
			});
		}
	}, [currentLine]);
	return (
		<>
			<Navbar />
			<div className=' bg-[#a4a4a4] rounded-[8px] h-[95%] pt-4 pl-[40px] overflow-y-auto hide-scrollbar'>
				<div className='text-4xl font-bold leading-relaxed h-full'>
					{/* {formatLyrics(lyrics).map((line, index) => (
						<p key={index} className='mb-2'>
							{line}
						</p>
					))} */}

					{lyrics && lyrics.length > 0 ? (
						lyrics.map((line, i) => (
							<p
								key={i}
								ref={lyricRefs.current[i]} // Đưa ref vào đây
								className='cursor-pointer hover:underline block'
								onClick={() => handleChange(line, i)}
								style={{
									color: i === currentLine ? 'black' : 'gray',
									fontWeight: i === currentLine ? 'bold' : 'normal',
									fontSize: i === currentLine ? '32px' : '28px',
									textDecorationLine: i === currentLine ? 'underline' : 'none',
								}}
							>
								{line.text}
							</p>
						))
					) : (
						<p>Tạm thời chưa có lời</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Lyrics;
