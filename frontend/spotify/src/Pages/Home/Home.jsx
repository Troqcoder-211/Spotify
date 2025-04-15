import React, { useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Display from '../../components/Display';
import { PlayerContext } from '../../context/PlayerContext';
import Modal from '../../components/Modal';
import SpotifyBanner from '../../components/SpotofyBanner';
import { useSelector } from 'react-redux';

const Home = () => {
	const { audioRef, track } = useContext(PlayerContext);
	const { isAuthenticated } = useSelector((state) => state.auth);
	return (
		<>
			<div className='box-border'>
				<div className='w-full h-screen bg-black '>
					<div className='h-[90%] flex'>
						<Sidebar />
						<Display />
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

//   const { audioRef, track } = useContext(PlayerContext);

//   const [isLogin, setIsLogin] = useState(false);
//   console.log(isLogin, setIsLogin);
//   return (
//     <>
//       <div className="box-border">
//         <div className="w-full h-screen bg-black ">
//           <div className="h-[90%] flex">
//             <Sidebar />
//             <Display />
//           </div>
//           {isLogin ? (
//             <>
//               <Player />
//               <audio ref={audioRef} src={track.file} preload="auto"></audio>
//             </>
//           ) : (
//             <SpotifyBanner />
//           )}
//         </div>
//         <Modal />
//       </div>
//     </>
//   );

};

export default Home;
