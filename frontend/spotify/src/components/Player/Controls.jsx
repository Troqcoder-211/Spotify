import React from 'react';
import { assets } from '../../assets/img/assets';

const Controls = ({
	isPlaying,
	repeatMode,
	isShuffle,
	togglePlay,
	handlePrev,
	handleNext,
	handleShuffle,
	handleRepeat,
	disabled,
}) => {
	return (
		<>
			<div className='flex gap-y-4 gap-x-7 items-center'>
				<img
					onClick={handleShuffle}
					className='w-5 cursor-pointer '
					src={isShuffle ? assets.shuffle_e_icon : assets.shuffle_icon}
					alt='shuffle'
				/>
				<img
					onClick={handlePrev}
					className={`w-5 cursor-pointer  ${disabled ? 'hidden' : 'flex'} `}
					src={assets.prev_icon}
					alt='prev'
				/>

				{/* play and pause button */}

				{isPlaying ? (
					<div
						onClick={togglePlay}
						className={`h-12 w-12 bg-[#00c951] rounded-[50%] flex  items-center justify-center  cursor-pointer select-none `}
					>
						<img
							className='w-6 cursor-pointer '
							src={assets.pause_icon}
							alt='pause'
						/>
					</div>
				) : (
					<div
						onClick={togglePlay}
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
					onClick={handleNext}
					className={`w-5 cursor-pointer  ${disabled ? 'hidden' : 'flex'} `}
					src={assets.next_icon}
					alt='next'
				/>
				<img
					onClick={handleRepeat}
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
		</>
	);
};

export default Controls;
