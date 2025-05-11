// components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({
	currentTime,
	totalTime,
	onSeekStart,
	onSeekMove,
	onSeekEnd,
	formatTime,
	disabled,
}) => {
	const calculateWidth = () => {
		const currentSec = currentTime.minute * 60 + currentTime.second;
		const totalSec = totalTime.minute * 60 + totalTime.second || 1;
		return (currentSec / totalSec) * 100;
	};

	return (
		<div className={`${disabled ? 'hidden' : 'flex'} items-center gap-5`}>
			<p>{formatTime(currentTime)}</p>
			<div
				onMouseDown={onSeekStart}
				onMouseMove={onSeekMove}
				onMouseUp={onSeekEnd}
				onMouseLeave={onSeekEnd}
				className='group w-[60vw] max-w-[800px] bg-[#4d4d4d] rounded-full cursor-pointer relative h-[4px] expand-hitbox'
			>
				<div
					style={{
						width: `${calculateWidth()}%`,
					}}
					className='h-full bg-[#fff] rounded-full absolute top-0 left-0 group-hover:bg-[#1db954]'
				>
					<div className='hidden group-hover:block w-4 h-4 bg-white rounded-full absolute -right-1 top-1/2 -translate-y-1/2'></div>
				</div>
			</div>
			<p>{formatTime(totalTime)}</p>
		</div>
	);
};

export default ProgressBar;
