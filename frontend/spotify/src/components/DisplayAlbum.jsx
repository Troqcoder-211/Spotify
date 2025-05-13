import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/img/assets';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../features/player/playerSlice';
import TrackService from '../services/TrackService';
import AlbumService from '../services/AlbumService';
import _ from 'lodash';
import LikeTrackService from '../services/LikeTrackService';
import { toast } from 'react-toastify';

const DisplayAlbum = () => {
	const { user } = useSelector((state) => state.auth);
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

	const handleLikeTrack = async (e, track_id) => {
		e.stopPropagation();
		const res = await LikeTrackService.userLikeTrack(user.id, track_id);
		if (res.success) {
			toast.success('Liked!');
			const likedSongsClone = _.cloneDeep(likedSongs);
			likedSongsClone.push(res.data);
			console.log('>>nghi like', likedSongsClone);
			setLikedSongs([...likedSongsClone]);
		}
	};
	const handleUnLikeTrack = async (e, track_id) => {
		e.stopPropagation();
		const res = await LikeTrackService.unlikeTrack(user.id, track_id);
		if (res.success) {
			toast.success('Unliked!');
			const likedSongsClone = _.cloneDeep(likedSongs);
			const rs = likedSongsClone.filter((s) => s.track !== track_id);
			console.log('>>nghi xoas', rs);
			setLikedSongs([...rs]);
		}
	};
	useEffect(() => {
		getSongLike(user.id);
	}, []);

	const initAlbum = {
		songs: 0,
		times: 0,
	};
	const { isEnded } = useSelector((state) => state.player);
	const { id } = useParams();
	const [album, setAlbum] = useState(initAlbum);
	const [tracks, setTracks] = useState([]);
	const dispatch = useDispatch();

	const getTrackByAlbum = async (id) => {
		const res = await TrackService.getByAlbum(id);
		if (res.success) {
			setTracks(res.data);
		} else {
			setTracks([]);
		}
	};
	const getAlbumById = async (id) => {
		const res = await AlbumService.getById(id);
		if (res.success) {
			setAlbum((prev) => ({ ...prev, ...res.data }));
		} else {
			setAlbum(initAlbum);
		}
	};

	const handlePlayTrack = async (song) => {
		dispatch(addTrack(song));

		if (!isEnded) return;

		const res = await TrackService.increasePopularity(song.track_id);
		if (res.success) {
			const tracksClone = _.cloneDeep(tracks);
			const rs = tracksClone.map((track) => {
				if (track.track_id === song.track_id) {
					track.popularity += 1;
				}
				return track;
			});

			setTracks(rs);
		}
		// console.log('>>>>>>>>>>>res', res);
	};

	const formatTime = (duration) => {
		if (!duration || isNaN(duration)) return '0:00';
		const minute = Math.floor(duration / 60);
		const second = duration % 60;
		return `${minute}:${second < 10 ? `0${second}` : second}`;
	};
	useEffect(() => {
		getTrackByAlbum(id);
		getAlbumById(id);
	}, [id]);

	// useEffect(() => {

	// }, []);
	return (
		<>
			<Navbar />
			<div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end '>
				<img
					className='w-48 rounded h-48 object-cover'
					src={album.cover_img_url}
				/>
				<div className='flex flex-col'>
					<p className='font-bold text-2xl'> Playlist</p>
					<h2 className='text-5xl font-bold mb-4 md:text-7xl '>{album.name}</h2>
					<h4>{album.desc}</h4>
					<p className='mt-1'>
						<img
							className='inline-block w-5 mr-2'
							src={assets.spotify_logo}
							alt=''
						/>
						<b>Spotify</b>
						<span className='mx-2'>·</span>
						<b>{tracks.length} songs</b>
						<span className='mx-2'>·</span>
						<b>
							{tracks &&
								tracks.length > 0 &&
								formatTime(
									tracks.reduce((total, track) => total + track.duration, 0)
								)}
						</b>
					</p>
				</div>
			</div>
			<div className='grid grid-cols-3 sm:grid-cols-4  mb-4 pl-2 text-[#a7a7a7]'>
				{/* <p>
					<b className='mr-4'>#</b>Title
				</p>
				<p>album</p>
				<p className='hidden sm:block'>Date Added</p>
				<img className='m-auto w-4 ' src={assets.clock_icon} alt='clock icon' /> */}
			</div>
			<hr className='my-8' />
			{tracks.map((song, index) => (
				<div
					onClick={() => handlePlayTrack(song)}
					key={index}
					className='flex p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
				>
					<p className='text-white font-bold flex-4 flex items-center'>
						<b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
						<img
							className='w-15 h-15 object-cover mr-5 rounded-[6px]'
							src={song.img_path}
							alt=''
						/>
						{song.title}
					</p>
					<p className='text-[15px] hidden sm:block ml-4 whitespace-nowrap flex-2'>
						🔥 {song.popularity}
					</p>
					<p className='text-[15px] text-center ml-4 whitespace-nowrap flex-2'>
						{formatTime(song.duration)}
					</p>
					<div className='flex-2 flex justify-center '>
						{likedSongs &&
						likedSongs.length > 0 &&
						likedSongs.some((s) => s.track === song.track_id) ? (
							<img
								src={assets.heart_e}
								alt=''
								className='w-6 h-6 object-cover cursor-pointer'
								onClick={(e) => handleUnLikeTrack(e, song.track_id)}
							/>
						) : (
							<img
								src={assets.heart}
								alt=''
								className='w-6 h-6 object-cover cursor-pointer'
								onClick={(e) => handleLikeTrack(e, song.track_id)}
							/>
						)}
					</div>
				</div>
			))}
		</>
	);
};

export default DisplayAlbum;
