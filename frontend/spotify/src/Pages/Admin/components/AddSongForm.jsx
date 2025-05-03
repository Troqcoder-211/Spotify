import React, { useRef, useState, useEffect } from 'react';
import TrackService from '../../../services/TrackService';
import ArtistService from '../../../services/ArtistService';

const AddSongForm = ({ albums = [], onClose, onSuccess }) => {
	const imageInputRef = useRef(null);
	const audioInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [artistSuggestions, setArtistSuggestions] = useState([]);

	const [files, setFiles] = useState({ image: null, audio: null });
	const [newSong, setNewSong] = useState({
		title: '',
		artist: '',
		artist_id: '',
		duration: '',
		album: '',
	});

	const handleArtistSearch = async (searchTerm) => {
		if (!searchTerm.trim()) {
			setArtistSuggestions([]);
			return;
		}

		try {
			const response = await ArtistService.search(searchTerm);
			if (response.success) {
				setArtistSuggestions(response.data);
			}
		} catch (error) {
			console.error('Lỗi khi tìm kiếm nghệ sĩ:', error);
			setArtistSuggestions([]);
		}
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (newSong.artist) {
				handleArtistSearch(newSong.artist);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [newSong.artist]);

	const handleArtistSelect = (artist) => {
		if (artist)
			setNewSong((prev) => ({
				...prev,
				artist: artist.name,
				artist_id: artist.artist_id,
			}));
		setArtistSuggestions([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Kiểm tra các trường bắt buộc
			console.log(newSong.title);
			console.log(files.audio);
			console.log(newSong.artist_id);
			if (!newSong.title || !files.audio || !newSong.artist_id) {
				alert('Vui lòng điền đầy đủ thông tin bắt buộc');
				setIsLoading(false);
				return;
			}

			// Lấy duration từ file audio
			const durationInSeconds = await new Promise((resolve) => {
				const audio = new Audio(URL.createObjectURL(files.audio));
				audio.addEventListener('loadedmetadata', () => {
					resolve(Math.floor(audio.duration));
				});
			});

			// Gọi API thêm nhạc
			const response = await TrackService.add({
				title: newSong.title,
				duration: durationInSeconds,
				file_path: files.audio,
				album: newSong.album === 'none' ? 'none' : newSong.album,
				artist_id: newSong.artist_id,
				track_number: null,
				popularity: 0,
				preview_url: '',
				is_active: true,
			});

			if (!response.success) {
				throw new Error(response.message || 'Response lỗi');
			}

			alert(`Thêm bài hát ${newSong.title} thành công!`);
			onSuccess?.();
			onClose();
		} catch (error) {
			alert(error.message || 'Có lỗi xảy ra khi thêm bài hát');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
			<div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
				<div className='bg-zinc-900 border border-zinc-700 w-[90%] max-w-md rounded-lg p-6 space-y-5 relative text-white'>
					{/* Hidden Inputs */}
					<input
						type='file'
						accept='audio/*'
						ref={audioInputRef}
						hidden
						onChange={(e) =>
							setFiles((prev) => ({ ...prev, audio: e.target.files?.[0] }))
						}
					/>
					<input
						type='file'
						accept='image/*'
						ref={imageInputRef}
						hidden
						onChange={(e) =>
							setFiles((prev) => ({ ...prev, image: e.target.files?.[0] }))
						}
					/>

					{/* Image Upload Box */}
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-green-400'>Image selected:</div>
									<div className='text-xs text-gray-400'>
										{files.image.name.slice(0, 20)}
									</div>
								</div>
							) : (
								<>
									<div className='mb-2 text-gray-400 text-2xl'>📁</div>
									<div className='text-sm text-gray-400 mb-2'>
										Upload artwork
									</div>
									<div className='inline-block px-3 py-1 text-xs border border-gray-400 rounded'>
										Choose File
									</div>
								</>
							)}
						</div>
					</div>

					{/* Audio Upload Button */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Audio File *</label>
						<button
							type='button'
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-left'
							onClick={() => audioInputRef.current?.click()}
						>
							{files.audio ? files.audio.name : 'Choose Audio File'}
						</button>
					</div>

					{/* Title */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Title *</label>
						<input
							type='text'
							value={newSong.title}
							onChange={(e) =>
								setNewSong((prev) => ({ ...prev, title: e.target.value }))
							}
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
							required
						/>
					</div>

					{/* Artist */}
					<div className='space-y-2 relative'>
						<label className='text-sm font-medium'>Artist *</label>
						<input
							type='text'
							value={newSong.artist}
							onChange={(e) => {
								setNewSong((prev) => ({
									...prev,
									artist: e.target.value,
									artist_id: '',
								}));
							}}
							placeholder='Nhập tên nghệ sĩ để tìm kiếm...'
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
							required
						/>
						{artistSuggestions.length > 0 && (
							<div className='absolute w-full bg-gray-800 border border-gray-600 rounded mt-1 max-h-40 overflow-y-auto z-50'>
								{artistSuggestions.map((artist) => (
									<div
										key={artist.artist_id}
										className='px-3 py-2 hover:bg-gray-700 cursor-pointer'
										onClick={() => handleArtistSelect(artist)}
									>
										{artist.name}
									</div>
								))}
							</div>
						)}
					</div>

					{/* Album Select */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>
						<select
							value={newSong.album}
							onChange={(e) =>
								setNewSong((prev) => ({ ...prev, album: e.target.value }))
							}
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
						>
							<option value=''>-- Select Album --</option>
							<option value='none'>No Album (Single)</option>
							{albums.map((album) => (
								<option key={album.album_id} value={album.album_id}>
									{album.title}
								</option>
							))}
						</select>
					</div>

					<div className='flex justify-end gap-4 pt-4'>
						<button
							className='px-4 py-2 border border-zinc-500 rounded text-white hover:bg-zinc-700'
							onClick={() => onClose()}
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							className='px-4 py-2 rounded text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-50'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							{isLoading ? 'Adding...' : 'Add Song'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddSongForm;
