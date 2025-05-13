import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

import SingerItem from './SingerItem';
import TrackService from '../services/TrackService';
import ArtistService from '../services/ArtistService';
import AlbumService from '../services/AlbumService';
import { useSelector } from 'react-redux';
import LikeTrackService from '../services/LikeTrackService';

const DisplayHome = () => {
	const [artists, setArtists] = useState([]);
	const [albums, setAlbums] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const getAllArtists = async () => {
		const res = await ArtistService.getAll();
		if (res.success) {
			setArtists(res.data);
		} else {
			setArtists([]);
		}
	};

	const getAllAlbums = async () => {
		const res = await AlbumService.getAll();
		if (res.success) {
			setAlbums(res.data);
		} else {
			setAlbums([]);
		}
	};
	const [songs, setSongs] = useState([]);

	const getAllSongs = async () => {
		const res = await TrackService.getRecommended(30);
		if (res.success) {
			setSongs(res.data);
		} else {
			alert('Lấy danh sách nhạc thất bại');
			setSongs([]);
		}
	};
	const [likedSongs, setLikedSongs] = useState([]);
	const getSongLike = async (userId) => {
		const res = await LikeTrackService.getByUser(userId);
		console.log('>>>>>>>>>>>', res);
		if (res.success) {
			setLikedSongs(res.data);
		} else {
			setLikedSongs([]);
		}
	};
	useEffect(() => {
		getAllSongs();
		getAllArtists();
		getAllAlbums();
		getSongLike(user?.id);
	}, []);
	return (
		<>
			<Navbar />
			<div className='h-[95%]'>
				{/* Featured Charts */}
				<div className='mb-4'>
					<h1 className='my-5 font-bold text-2xl'>Album quen thuộc</h1>
					<div className='flex overflow-auto gap-x-3 custom-scrollbar'>
						{albums.map((item, index) => {
							return <AlbumItem key={index} props={item} />;
						})}
					</div>
				</div>
				{/* Today's biggest hits */}
				<div className='mb-4'>
					<h1 className='my-5 font-bold text-2xl '>Gợi ý cho hôm nay</h1>
					<div className='flex overflow-auto custom-scrollbar'>
						{songs
							.filter((s) => s.file_path)
							.map((item, index) => {
								return (
									<SongItem
										likedSongs={likedSongs}
										setLikedSongs={setLikedSongs}
										key={index}
										props={item}
									/>
								);
							})}
					</div>
				</div>

				{/* Popular artists */}
				<div className='mb-4'>
					<h1 className='my-5 font-bold text-2xl'>Nghệ sĩ phổ biến</h1>
					<div className='flex overflow-auto custom-scrollbar'>
						{artists.map((item, index) => {
							return <SingerItem key={index} props={item} />;
						})}
					</div>
				</div>
				{/* Video */}
				<div className='mb-4'>
					<h1 className='my-5 font-bold text-2xl'>MV nổi bật</h1>
					<div className='flex overflow-auto custom-scrollbar'>
						{songs
							.filter((s) => s.video_path)
							.map((item, index) => {
								return <SongItem key={index} props={item} />;
							})}
					</div>
				</div>
			</div>
		</>
	);
};

export default DisplayHome;
