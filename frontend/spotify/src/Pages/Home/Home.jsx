import React, { useContext, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Display from '../../components/Display';
import { PlayerContext } from '../../context/PlayerContext';
import Modal from '../../components/Modal';
import SpotifyBanner from '../../components/SpotofyBanner';
import FriendListeningSidebar from '../../components/FriendListeningSideBar';
import { useSelector } from 'react-redux';

const Home = () => {
	const { audioRef, track } = useContext(PlayerContext);
	const { isAuthenticated } = useSelector((state) => state.auth);

	const [isLogin, setIsLogin] = useState(false);
	console.log(isLogin, setIsLogin);
	return (
		<>
			<div className='box-border'>
				<div className='w-full h-screen bg-black '>
					<div className='h-[90%] flex'>
						<Sidebar />
						<Display />
						<FriendListeningSidebar />
					</div>
					{isLogin ? (
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
