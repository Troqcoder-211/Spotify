import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LikedSongsItem from './LikedSongsItem';
import FolderMusic from './FolderMusicItem';
import AlbumLibrary from './AlbumLibraryItem';
import ArtisLibraryItem from './ArtisLibraryItem';


import { assets } from '../assets/img/assets';
import { AiOutlineSearch } from 'react-icons/ai';
import { LuLibrary } from 'react-icons/lu';
import { IoMdMenu } from 'react-icons/io';
import { PiMusicNotesPlus } from 'react-icons/pi';
import { AiOutlineFolder } from 'react-icons/ai';

import FolderService from '../services/FolderService';
import { useSelector } from 'react-redux';

const Sidebar = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const [playlist, setPlaylist] = useState([]);
	const [music, setMusic] = useState([
		{
			id: 1,
			name: 'Bài hát 1',
			image: assets.baihat1,
			desc: 'Bài hát 1',
		},
		{
			id: 2,
			name: 'Bài hát 2',
			image: assets.baihat2,
			desc: 'Bài hát 2',
		},
		{
			id: 3,
			name: 'Bài hát 3',
			image: assets.baihat3,
			desc: 'Bài hát 3',
		},
	]);

	const [folders, setFolders] = useState([]);

	const getAllFolders = async () => {
		if (!isAuthenticated) return;

		const res = await FolderService.getAllFolders();
		// console.log('folerd?>>>>>>>>>>', res);
		setFolders(res.data);
	};

	useEffect(() => {
		getAllFolders();
	}, []);

	const [createFolder, setCreateFolder] = useState(false);

	const handleCreateFolder = () => {
		setCreateFolder(!createFolder);
	};

	const navigate = useNavigate();
	return (
		<div className='w-[25%]  h-full  flex-col gap-2 text-white hidden lg:flex '>
			<div className='bg-[#121212] h-[10%] rounded flex items-center justify-center'>
				{/* Home Icon */}
				<div
					onClick={() => navigate('/')}
					className='flex  items-center gap-3 pl-8 cursor-pointer mx-2 '
				>
					<div className='w-12 h-12 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] flex items-center justify-center duration-300'>
						<img
							className='w-6 text-white cursor-pointer '
							src={assets.home_icon}
							alt='HomeIcon'
						/>
					</div>
				</div>
				{/* Search Icon */}

				<div className=' relative hidden sm:block'>
					<AiOutlineSearch className='absolute text-[20px] top-[16px] left-[10px] text-gray-500' />
					<input
						className='bg-[#F0F2F5] w-full h-12 dark:bg-[#333334] p-2 rounded-full pl-9 outline-none placeholder:text-white'
						type='text'
						placeholder='Bạn cần nghe gì?'
					/>
				</div>
			</div>

			<div className='bg-[#121212] h-[95%] rounded relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#121212]'>
				<div className='p-4 flex items-center justify-between'>
					{/* Your Library */}
					<div className='flex items-center gap-3'>
						<div className='text-[#656565] cursor-pointer flex items-center gap-1 hover:text-white duration-200'>
							<LuLibrary className='w-8 h-8' />
							<p className='font-semibold'>Thư viện</p>
						</div>
					</div>
					{/*  Arrow and Plus */}
					<div className='flex items-center gap-3 '>
						<button
							onClick={handleCreateFolder}
							className='flex items-center gap-1 bg-[#1f1f1f] px-4 py-1.5 rounded-full hover:bg-[#2a2a2a]'
						>
							<img
								className={`w-5 ${createFolder && 'rotate-45 duration-300'}  ${
									!createFolder && 'rotate-[-45] duration-300'
								} cursor-pointer`}
								src={assets.plus_icon}
								alt='ArrowIcon'
							/>
							<p className='text-white'>Tạo</p>
						</button>
						{/* <div className="flex  items-center gap-1 bg-[#1f1f1f] px-4 py-1.5 rounded-full hover:bg-[#2a2a2a]">
              <img
                className="w-5 h-5 cursor-pointer"
                src={assets.arrow_icon}
                alt="ArrowIcon"
              />
            </div> */}
					</div>
				</div>

				{/* Create Playlist Folder */}
				{createFolder && (
					<div className='absolute translate-x-[50%] -translate-y-1/14 z-50'>
						<div className='w-[348px] h-[140px] bg-[#282828] gap-2 p-2 rounded-xl'>
							{/* Item choice */}
							<div className='flex gap-2  items-center justify-start hover:bg-[#222222] hover:rounded-2xl p-2 '>
								<div className='bg-[#6a6a6a] w-[48px] h-[48px] flex items-center justify-center rounded-full'>
									<PiMusicNotesPlus className='w-8 h-8 hover:text-green-500' />
								</div>
								<div>
									<p className='text-[20px]'>Playlist</p>
									<p className='text-[12px] text-[#b3b3b3]'>
										Tạo danh sách phát gồm bài hát hoặc tập
									</p>
								</div>
							</div>

							<hr style={{ backgroundColor: 'hsla(0, 0%, 100%, .1)' }}></hr>

							{/* Item choice */}
							<div className='flex gap-2 items-center justify-start hover:bg-[#222222] hover:rounded-2xl p-2 '>
								<div className='bg-[#6a6a6a] w-[48px] h-[48px] flex items-center justify-center rounded-full '>
									<AiOutlineFolder className='w-8 h-8 hover:text-green-500  ' />
								</div>
								<div>
									<p className='text-[20px]'>Thư mục</p>
									<p className='text-[12px] text-[#b3b3b3]'>
										Sắp xếp danh sách phát của bạn
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{playlist ? (
					<>
						{/* Classification type */}
						<div className='flex items-center '>
							<button className='mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]'>
								PLaylist
							</button>
							<button className='mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]'>
								Nghệ sĩ
							</button>
							<button className='mt-2 ml-2 py-1.5 px-2.5 text-[14px] rounded-full font-semibold hover:bg-[#2a2a2a] bg-[#1f1f1f]'>
								Ablum
							</button>
						</div>
					</>
				) : (
					<>
						{/* Playlist */}
						<div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 '>
							<h1>Tạo danh sách phát đầu tiên của bạn</h1>
							<p className='font-light'>Thật dễ dàng, chúng tôi sẽ giúp bạn</p>
							<button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 transition-transform duration-300 hover:scale-105'>
								Tạo danh sách phát
							</button>
						</div>
					</>
				)}

				{/* Podcasts */}
				{/* <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 ">
          <h1>Let's findsome podcasts to follow</h1>
          <p className="font-light">ưe'll keep your update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div> */}

				<div className='flex items-center justify-between'>
					<button
						onClick={() => {}}
						className='mr-4 p-2 flex items-center justify-between hover:rounded-full hover:bg-[#2a2a2a]'
					>
						<AiOutlineSearch className='w-6 h-6' />
						<input
							className='bg-transparent outline-none text-white text-[10px]'
							placeholder=' Tìm kiếm trong thư viện'
						/>
					</button>
					<div className='p-4 gap-2 flex items-center justify-center text-[#656565] hover:text-white hover:transition-transform hover:duration-300 hover:scale-105 cursor-pointer'>
						<p className='font-semibold '>Gần đây</p>
						<IoMdMenu className=' w-6 h-6' />
					</div>
				</div>

				<div className='flex flex-col items-center '>
					<div className='w-full'>
						<LikedSongsItem props={music} />

						{folders.length === 0 ? (
							<p>Không có thư mục nào.</p>
						) : (
							folders.map((folder, index) => (
								<FolderMusic key={index} name={folder.title} />
							))
						)}
						{/* <FolderMusic /> */}

						{/* {album.map((album, index) => (
              <AlbumLibrary props={album} key={index} />
            ))}

            <ArtisLibraryItem /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
