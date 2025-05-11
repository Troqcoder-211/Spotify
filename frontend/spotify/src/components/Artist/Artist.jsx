import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { MdVerified } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ArtistService from '../../services/ArtistService';
import TrackService from '../../services/TrackService';
import { addTrack } from '../../features/player/playerSlice';
import { useDispatch } from 'react-redux';

const Artist = () => {
	const [artist, setArtist] = useState({});
	const [songs, setSongs] = useState([]);
	const { id } = useParams();
	const dispatch = useDispatch();
	const getArtistById = async () => {
		const res = await ArtistService.getById(id);
		if (res.success) {
			setArtist(res.data);
		} else setArtist({});
	};
	const getAllSongs = async (id) => {
		const res = await TrackService.getByArtist(id);
		console.log('Arrtist', res);
		if (res.success) {
			setSongs(res.data);
		} else setSongs([]);
	};

	// Hàm chuyển đổi giây thành phút:giây
	const formatDuration = (durationInSeconds) => {
		const minutes = Math.floor(durationInSeconds / 60);
		const seconds = durationInSeconds % 60;
		return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
	};
	useEffect(() => {
		getArtistById();
		getAllSongs(id);
	}, []);

	return (
		<>
			<Navbar />
			<div className='pt-3 artist-container flex flex-col h-[95%]'>
				{/* TOP - background + tên đè lên */}
				<div
					className='flex-1 relative bg-cover bg-center h-full rounded-[8px]'
					style={{
						backgroundImage: `url('${artist.bg_picture}')`,
					}}
				>
					<div className='absolute inset-0 bg-black opacity-50'></div>{' '}
					{/* Tạo lớp phủ mờ */}
					<div className='absolute bottom-4 left-6'>
						<p className='text-[16px] text-white font-bold mb-3'>
							<MdVerified className='inline text-[#5fb4ff] text-2xl' /> Verified
							Artist
						</p>
						<p className=' text-7xl text-white font-extrabold drop-shadow-lg ml-2 mb-8'>
							{artist.name || 'Tên Nghệ Sĩ'}
						</p>
					</div>
				</div>

				{/* BODY - danh sách bài hát */}
				<div className='flex-1 overflow-y-auto p-4 mt-5'>
					<h3 className='text-2xl text-white font-bold mb-5'>Popular</h3>
					<ul className='space-y-2'>
						{songs.map((song, index) => (
							<li
								onClick={() => {
									dispatch(addTrack(song));
								}}
								key={song.track_id}
								className='flex items-center p-2 gap-4 cursor-pointer hover:bg-[#2b2b2b] rounded-[8px] pl-6'
							>
								{/* STT */}
								<span className='w-6 text-gray-500'>{index + 1}</span>

								{/* Image */}
								<img
									src={song.img_path}
									alt={song.title}
									className='w-12 h-12 object-cover rounded-md'
								/>
								<p className='flex-3 text-[15px] font-semibold'>{song.title}</p>

								{/* Info */}
								<div className='flex-2 flex ml-auto'>
									<p className='text-sm font-semibold flex-1'>
										🔥 {song.popularity}
									</p>

									<p className='text-sm text-[#a4a4a4] font-semibold  flex-1'>
										{formatDuration(song.duration)}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Artist;
