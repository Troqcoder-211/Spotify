import React from 'react';
import { X } from 'lucide-react'; // dùng icon X, bạn có thể thay bằng SVG khác nếu cần

const QueueCard = ({ nowPlaying, nextUp, onClose }) => {
	return (
		<div className='w-[510px] h-[100%] p-1 bg-[#1e1e1e] text-white rounded-lg flex flex-col shadow-lg'>
			{/* Header */}
			<div className='flex justify-between items-center px-4 py-2 border-b border-gray-600'>
				<h2 className='text-lg font-semibold'>Queue</h2>
				<button onClick={onClose} className='hover:text-red-500'>
					<X size={20} />
				</button>
			</div>

			{/* Body */}
			<div className='flex-1 flex flex-col gap-6 p-4 overflow-y-auto'>
				{/* Now Playing */}
				<div>
					<p className='text-sm text-gray-400 mb-2'>Now playing</p>
					<SongCard song={nowPlaying} />
				</div>

				{/* Next Up */}
				<div>
					<p className='text-sm text-gray-400 mb-2'>Next up</p>
					<SongCard song={nextUp} />
				</div>
			</div>
		</div>
	);
};

// SongCard subcomponent
const SongCard = ({ song }) => {
	return (
		<div className='w-full flex items-center gap-4 bg-[#2a2a2a] p-3 rounded'>
			<img
				src={song.img_path}
				alt={song.title}
				className='w-20 h-20 object-cover rounded'
			/>
			<div className='flex flex-col overflow-hidden'>
				<p className='font-semibold text-white truncate'>{song.title}</p>
				<p className='text-sm text-gray-400 truncate'>{song.artist}</p>
			</div>
		</div>
	);
};

export default QueueCard;
