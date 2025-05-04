import React, { useRef, useState, useEffect } from 'react';
import TrackService from '../../../services/TrackService';
import ArtistService from '../../../services/ArtistService';
import AlbumService from '../../../services/AlbumService';
import ArtistAlbumService from '../../../services/ArtistAlbumService';
import ArtistTrackService from '../../../services/ArtistTrackService';

const AddSongForm = ({ onClose, onSuccess }) => {
	const imageInputRef = useRef(null);
	const audioInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [artistSuggestions, setArtistSuggestions] = useState([]);
	const [artistAlbums, setArtistAlbums] = useState([]);
	const [albumDetails, setAlbumDetails] = useState([]); // Thêm state để lưu thông tin chi tiết album
	const [albumTracks, setAlbumTracks] = useState({}); // Lưu số lượng track trong mỗi album
	const [selectedArtists, setSelectedArtists] = useState([]); // Lưu danh sách nghệ sĩ đã chọn

	const [files, setFiles] = useState({ image: null, audio: null });
	const [newSong, setNewSong] = useState({
		title: '',
		artist: '',
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
				// Lọc ra những nghệ sĩ chưa được chọn
				const filteredArtists = response.data.filter(
					artist => !selectedArtists.find(selected => selected.artist_id === artist.artist_id)
				);
				setArtistSuggestions(filteredArtists);
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

	const getAlbumTrackCount = async (albumId) => {
		try {
			const tracksResponse = await TrackService.getByAlbum(albumId);
			if (tracksResponse.success) {
				setAlbumTracks(prev => ({
					...prev,
					[albumId]: tracksResponse.data.length
				}));
			}
		} catch (error) {
			console.error('Lỗi khi lấy số lượng track:', error);
		}
	};

	const handleArtistSelect = async (artist) => {
		if (artist) {
			// Thêm nghệ sĩ vào danh sách đã chọn
			setSelectedArtists(prev => [...prev, artist]);
			setNewSong(prev => ({ ...prev, artist: '' }));
			setArtistSuggestions([]);

			// Nếu là nghệ sĩ đầu tiên (nghệ sĩ chính), lấy danh sách album
			if (selectedArtists.length === 0) {
				try {
					const artistAlbumsResponse = await ArtistAlbumService.getAlbumsByArtistId(artist.artist_id);
					if (artistAlbumsResponse.success) {
						setArtistAlbums(artistAlbumsResponse.data);
						
						const albumDetailsPromises = artistAlbumsResponse.data.map(async (artistAlbum) => {
							const albumResponse = await AlbumService.getById(artistAlbum.album);
							if (albumResponse.success) {
								await getAlbumTrackCount(artistAlbum.album);
								return albumResponse.data;
							}
							return null;
						});
						
						const albumDetailsResults = await Promise.all(albumDetailsPromises);
						setAlbumDetails(albumDetailsResults.filter(album => album !== null));
					}
				} catch (error) {
					console.error('Lỗi khi lấy danh sách album:', error);
					setArtistAlbums([]);
					setAlbumDetails([]);
				}
			}
		}
	};

	const removeArtist = (artistId) => {
		setSelectedArtists(prev => prev.filter(artist => artist.artist_id !== artistId));
		if (selectedArtists.length === 1) {
			// Nếu xóa nghệ sĩ chính, reset album
			setNewSong(prev => ({ ...prev, album: '' }));
			setArtistAlbums([]);
			setAlbumDetails([]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Kiểm tra các trường bắt buộc
			if (!newSong.title || !files.audio || selectedArtists.length === 0) {
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

			// Tạo FormData object
			const formData = new FormData();
			formData.append('title', newSong.title);
			formData.append('duration', durationInSeconds);
			formData.append('album', newSong.album === 'none' ? 'none' : newSong.album);
			
			// Tự động tăng track_number
			const nextTrackNumber = newSong.album === 'none' ? null : (albumTracks[newSong.album] + 1);
			formData.append('track_number', nextTrackNumber);
			
			formData.append('popularity', '0');
			formData.append('preview_url', '');
			formData.append('is_active', 'true');
			// Thêm artist_id[] cho mỗi nghệ sĩ được chọn
			selectedArtists.forEach(artist => {
				formData.append('artist_id[]', artist.artist_id);
			});

			if (files.audio) {
				formData.append('file_path', files.audio);
			}

			if (files.image) {
				formData.append('img_path', files.image);
			}
      
			// Thêm bài hát
			const trackResponse = await TrackService.add(formData);

			if (!trackResponse.success) {
				throw new Error(trackResponse.error || 'Có lỗi xảy ra khi thêm bài hát');
			}

			// Thêm quan hệ artist-track
			const artistTrackPromises = selectedArtists.map((artist, index) => {
				return ArtistTrackService.add({
					artist: artist.artist_id,
					track: trackResponse.data.track_id,
					role: index === 0 ? 'primary' : 'featured',
					is_active: true
				});
			});

			await Promise.all(artistTrackPromises);

			alert(`Thêm bài hát ${newSong.title} thành công!`);
			onSuccess?.();
			onClose();
		} catch (error) {
			console.error('Lỗi khi thêm bài hát:', error);
			alert(error.message || 'Có lỗi xảy ra khi thêm bài hát');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
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

					{/* Selected Artists */}
					{selectedArtists.length > 0 && (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Selected Artists</label>
							<div className='flex flex-wrap gap-2'>
								{selectedArtists.map((artist, index) => (
									<div
										key={artist.artist_id}
										className={`px-3 py-1 rounded-full flex items-center gap-2 ${
											index === 0 ? 'bg-violet-600' : 'bg-gray-700'
										}`}
									>
										<span>{artist.name}</span>
										<button
											onClick={() => removeArtist(artist.artist_id)}
											className='text-gray-400 hover:text-white'
										>
											×
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Artist Search */}
					<div className='space-y-2 relative'>
						<label className='text-sm font-medium'>
							{selectedArtists.length === 0 ? 'Primary Artist *' : 'Add Featured Artist'}
						</label>
						<input
							type='text'
							value={newSong.artist}
							onChange={(e) => {
								setNewSong((prev) => ({
									...prev,
									artist: e.target.value,
								}));
							}}
							placeholder='Nhập tên nghệ sĩ để tìm kiếm...'
							className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
							required={selectedArtists.length === 0}
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
					{selectedArtists.length > 0 && (
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
								{albumDetails.map((album) => (
									<option key={album.album_id} value={album.album_id}>
										{album.title}
									</option>
								))}
							</select>
						</div>
					)}

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
