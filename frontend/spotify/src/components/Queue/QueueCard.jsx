import React from 'react';
import { X } from 'lucide-react'; // dùng icon X, bạn có thể thay bằng SVG khác nếu cần
import SongCard from './SongCard';
import { useSelector } from 'react-redux';

const QueueCard = ({ onClose }) => {
	const { playlist, currentTrackIndex } = useSelector((state) => state.player);

	const listQueue = [...playlist];

	return (
		<div className='w-[460px] h-[100%] p-1 bg-[#1e1e1e] text-white rounded-lg flex flex-col shadow-lg'>
			{/* Header */}
			<div className='flex justify-between items-center px-4 py-2 border-b border-gray-600'>
				<h2 className='text-lg font-semibold'>Queue</h2>
				<button onClick={onClose} className='hover:text-red-500 cursor-pointer'>
					<X size={20} />
				</button>
			</div>

			{/* Body */}
			<div className='flex-1 flex flex-col gap-6 p-4 overflow-y-auto'>
				{/* Now Playing */}
				<div>
					<p className='text-sm text-gray-400 mb-2'>Now playing</p>
					{playlist[currentTrackIndex] ? (
						<SongCard song={playlist[currentTrackIndex]} />
					) : (
						<p>Không có bài đang phát</p>
					)}
				</div>

				{/* Next Up */}
				<div>
					<p className='text-sm text-gray-400 mb-2'>Next up</p>
					{listQueue && listQueue.length ? (
						listQueue.map((song) => (
							<SongCard key={song.track_id} song={song} />
						))
					) : (
						<p>Danh sách phát trống</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default QueueCard;
