import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player/Player';
import Display from '../../components/Display';
import Modal from '../../components/Modal';
import SpotifyBanner from '../../components/SpotofyBanner';
import FriendListeningSidebar from '../../components/FriendListeningSideBar';
import { useSelector } from 'react-redux';

const Home = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	return (
		<>
			<div className='box-border'>
				<div className='w-full h-screen bg-black relative'>
					<div className='h-[90%] flex'>
						{/* <Sidebar /> */}
						<Display />
						{/* <FriendListeningSidebar /> */}
					</div>
					{isAuthenticated ? (
						<>
							<Player />
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
