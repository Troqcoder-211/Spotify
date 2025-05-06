import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '../hooks/useDebounce';
import SearchService from '../services/SearchService';
import { useDispatch } from 'react-redux';
import { addTrack } from '../features/player/playerSlice';

const Search = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false); // Hiển thị khung kết quả
	const debouncedQuery = useDebounce(query, 500);
	const searchRef = useRef(null); // Tham chiếu tới vùng tìm kiếm
	const dispatch = useDispatch();
	const handleSearchChange = (event) => {
		setQuery(event.target.value);
		setShowResults(true);
	};

	const handleClick = (song) => {
		dispatch(addTrack(song));
		setShowResults(false);
	};
	// Xử lý khi click ra ngoài
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (debouncedQuery) {
			const fetchResults = async () => {
				const response = await SearchService.search(debouncedQuery);
				if (response.success) {
					console.log(response.data);
					setResults(response.data);
				} else {
					console.error('Search failed:', response.error);
					setResults([]);
				}
			};

			fetchResults();
		} else {
			setResults([]);
		}
	}, [debouncedQuery]);

	return (
		<div ref={searchRef} className='relative hidden sm:block mr-4 flex-1'>
			<AiOutlineSearch className='absolute text-[20px] top-[14px] left-[10px] text-gray-500' />
			<input
				className='bg-[#343434] w-full h-12 dark:bg-[#333334] p-2 rounded-full pl-9 outline-none'
				type='text'
				placeholder='Bạn cần nghe gì?'
				value={query}
				onChange={handleSearchChange}
				aria-label='Tìm kiếm'
			/>

			{debouncedQuery && showResults && (
				<div className='absolute py-4 px-2 bg-[#343434] shadow-lg w-[600px] mt-2 rounded-lg max-h-[500px] overflow-y-auto z-10'>
					{results.length > 0 ? (
						results.map((result, index) => (
							<div
								onClick={() => handleClick(result)}
								key={index}
								className='flex items-center px-4 py-2 rounded-lg hover:bg-[#666666] cursor-pointer'
							>
								<img
									src={result.img_path}
									alt={result.title}
									className='w-12 h-12 mr-3 rounded-full'
								/>
								<div className='flex-1'>
									<h3 className='text-lg font-semibold'>{result.title}</h3>
									<p className='text-sm text-white-600'>
										{result.artists.map((a) => a?.name).join(',') ||
											'[Nghệ sĩ A, Nghệ sĩ B]'}
									</p>
								</div>
							</div>
						))
					) : (
						<div className='flex items-center px-4 py-2 rounded-lg'>
							<div className='flex-1'>
								<h3 className='text-lg text-center font-semibold'>
									Không tìm thấy
								</h3>
							</div>
						</div>
					)}
					<div className='flex items-center rounded-lg mt-4'>
						<div className='flex-1'>
							<h3 className='text-lg text-center font-semibold underline'>
								Kết quả tìm kiếm {results.length} bài hát
							</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
