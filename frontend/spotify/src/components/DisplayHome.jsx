import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { albumsData } from '../assets/img/assets';

import SingerItem from './SingerItem';
import TrackService from '../services/TrackService';
import ArtistService from '../services/ArtistService';

const DisplayHome = () => {
	const [artists, setArtists] = useState([]);

	const getAllArtists = async () => {
		const res = await ArtistService.getAll();

		console.log('>>>>>>>>>>>>>>>>', res);
		if (res.success) {
			setArtists(res.data);
		} else {
			setArtists([]);
		}
	};

	const [songs, setSongs] = useState([]);

	const getAllSongs = async () => {
		const res = await TrackService.getRecommended(7);
		if (res.success) {
			setSongs(res.data);
		} else {
			alert('Lấy danh sách nhạc thất bại');
			setSongs([]);
		}
	};
	useEffect(() => {
		getAllSongs();
		getAllArtists();
	}, []);
	return (
		<>
			<Navbar />

			{/* Featured Charts */}
			<div className='mb-4'>
				<h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
				<div className='flex overflow-auto'>
					{albumsData.map((item, index) => {
						return <AlbumItem key={index} props={item} />;
					})}
				</div>
			</div>
			{/* Today's biggest hits */}
			<div className='mb-4'>
				<h1 className='my-5 font-bold text-2xl'>Recommended for today</h1>
				<div className='flex overflow-auto'>
					{songs.map((item, index) => {
						return <SongItem key={index} props={item} />;
					})}
				</div>
			</div>

			{/* Popular artists */}
			<div className='mb-4'>
				<h1 className='my-5 font-bold text-2xl'>Nghệ sĩ phổ biến</h1>
				<div className='flex overflow-auto'>
					{artists.map((item, index) => {
						return <SingerItem key={index} props={item} />;
					})}
				</div>
			</div>
		</>
	);
};

export default DisplayHome;
