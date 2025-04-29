import React, { useContext, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Display from '../../components/Display';
import { PlayerContext } from '../../context/PlayerContext';
import Modal from '../../components/Modal';
import SpotifyBanner from '../../components/SpotofyBanner';
import FriendListeningSidebar from '../../components/FriendListeningSideBar';
import { useSelector } from 'react-redux';
import TrackService from '../../services/TrackService';

const Home = () => {
	const { audioRef, track } = useContext(PlayerContext);
	const { isAuthenticated } = useSelector((state) => state.auth);

	const fetchAllTracks = async () => {
		const res = await TrackService.getAll();
		if (res.success) {
			console.log('>>>>>thnah cong', res);
		} else {
			console.log('>>>>> loi', res);
		}
	};

	useEffect(() => {
		fetchAllTracks();
	}, []);

	return (
		<>
			<div className='box-border'>
				<div className='w-full h-screen bg-black '>
					<div className='h-[90%] flex'>
						<Sidebar />
						<Display />
						<FriendListeningSidebar />
					</div>
					{isAuthenticated ? (
						<>
							<Player />
							<audio ref={audioRef} src={track.file} preload='auto'></audio>
						</>
					) : (
						<SpotifyBanner />
					)}
				</div>
				<Modal isAuthenticated={isAuthenticated} />
			</div>
		</>
	);
};

export default Home;
