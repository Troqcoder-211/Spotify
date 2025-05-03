// SongCard subcomponent
const SongCard = ({ song }) => {
	return (
		<>
			{song && (
				<div className='w-full flex items-center gap-4 bg-[#2a2a2a] p-3 rounded mb-2'>
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
			)}
		</>
	);
};
export default SongCard;
