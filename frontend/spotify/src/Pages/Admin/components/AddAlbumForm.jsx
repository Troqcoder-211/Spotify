import { useRef, useState, useEffect } from "react";
import ArtistService from "../../../services/ArtistService";
import AlbumService from "../../../services/AlbumService";

const AddAlbumDialog = ({ onClose, onSuccess }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [artistSuggestions, setArtistSuggestions] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseDate: new Date().toISOString().split('T')[0],
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
      console.error("Lỗi khi tìm kiếm nghệ sĩ:", error);
      setArtistSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (newAlbum.artist) {
        handleArtistSearch(newAlbum.artist);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [newAlbum.artist]);

  const handleArtistSelect = (artist) => {
    if (artist && !selectedArtists.find(a => a.artist_id === artist.artist_id)) {
      setSelectedArtists([...selectedArtists, artist]);
      setNewAlbum(prev => ({
        ...prev,
        artist: "",
      }));
    }
    setArtistSuggestions([]);
  };

  const removeArtist = (artistId) => {
    setSelectedArtists(selectedArtists.filter(artist => artist.artist_id !== artistId));
  };
  
  const handleImageSelect = (e) => {
    const fileInput = e.target;
    const file = fileInput?.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Kiểm tra các trường bắt buộc
      if (!newAlbum.title || selectedArtists.length === 0) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc và chọn ít nhất một nghệ sĩ');
        setIsLoading(false);
        return;
      }

      // Tạo FormData object
      const formData = new FormData();
      formData.append('title', newAlbum.title || '');
      formData.append('release_date', newAlbum.releaseDate || '');
      formData.append('is_active', 'true');

      // Thêm từng artist_id riêng lẻ
      selectedArtists.forEach(artist => {
        formData.append('artists', artist.artist_id);
      });

      // Thêm file ảnh nếu có
      if (imageFile) {
        formData.append('cover_img_url', imageFile);
      }

      // Gọi API thêm album
      const response = await AlbumService.add(formData);
      
      if (!response.success) {
        throw new Error(response.message || 'Có lỗi xảy ra khi thêm album');
      }

      alert(`Thêm album ${newAlbum.title} thành công!`);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Lỗi khi thêm album:', error);
      alert(error.message || 'Có lỗi xảy ra khi thêm album');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-700 w-[90%] max-w-md rounded-lg p-6 space-y-5 relative text-white">
            <h2 className="text-xl font-semibold">Add New Album</h2>
            <p className="text-zinc-400 text-sm">
              Add a new album to your collection
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />

            <div
              className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2 text-zinc-400 text-xl">
                  ⬆️
                </div>
                <div className="text-sm text-zinc-400 mb-2">
                  {imageFile ? imageFile.name : "Upload album artwork"}
                </div>
                <button className="px-3 py-1 text-xs border border-zinc-500 rounded text-white">
                  Choose File
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-white">Album Title</label>
              <input
                type="text"
                value={newAlbum.title || ''}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                placeholder="Enter album title"
              />
            </div>

            <div className="space-y-1 relative">
              <label className="text-sm text-white">Artists</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedArtists.map((artist) => (
                  <div key={artist.artist_id} className="flex items-center bg-zinc-800 px-2 py-1 rounded">
                    <span>{artist.name}</span>
                    <button 
                      onClick={() => removeArtist(artist.artist_id)}
                      className="ml-2 text-zinc-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newAlbum.artist || ''}
                onChange={(e) => {
                  setNewAlbum((prev) => ({
                    ...prev,
                    artist: e.target.value,
                  }));
                }}
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                placeholder="Search for artists..."
              />
              {artistSuggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-10">
                  {artistSuggestions.map((artist) => (
                    <div
                      key={artist.artist_id}
                      className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                      onClick={() => handleArtistSelect(artist)}
                    >
                      {artist.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-white">Release Date</label>
              <input
                type="date"
                value={newAlbum.releaseDate || ''}
                onChange={(e) =>
                  setNewAlbum({
                    ...newAlbum,
                    releaseDate: e.target.value,
                  })
                }
                min="1900-01-01"
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                className="px-4 py-2 border border-zinc-500 rounded text-white hover:bg-zinc-700"
                onClick={() => onClose()}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Album'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAlbumDialog;
