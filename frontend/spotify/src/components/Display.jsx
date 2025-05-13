import React, { useEffect, useRef } from 'react';
import DisplayHome from './DisplayHome';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import ChatPage from '../Pages/Chat/ChatPage';
import PremiumOfferSection from './PremiumOfferSection';
import Lyrics from './Lyrics/Lyrics';
import Artist from './Artist/Artist';

const Display = () => {
	const displayRef = useRef(null);
	const location = useLocation();

	const isAlbum = location.pathname.includes('album');

	// const bgColor = albumsData.find((a) => +a.id === +id).bgColor;
	const bgColor = '#2a4365';

	useEffect(() => {
		displayRef.current.style.background = isAlbum
			? `linear-gradient(${bgColor},#121212)`
			: '#121212';
	});
	return (
		<div
			ref={displayRef}
			className='w-[100%] px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 '
		>
			<Routes>
				<Route index element={<DisplayHome />} />
				<Route path='/album/:id' element={<DisplayAlbum />} />
				<Route path='/chat' element={<ChatPage />} />
				<Route path='/lyrics' element={<Lyrics />} />
				{/* <Route path='/artist' element={<Artist />} /> */}
				<Route path='/artist/:id' element={<Artist />} />
				<Route path='/premium' element={<PremiumOfferSection />} />
			</Routes>
		</div>
	);
};

export default Display;
