import React, { useRef, useState } from "react";
import ArtistService from "../../../services/ArtistService";

const AddArtistForm = ({ onClose, onSuccess }) => {
  const imageInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState({ image: null });
  const [newArtist, setNewArtist] = useState({
    name: "",
    bio: "", 
    country: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Kiểm tra các trường bắt buộc
      if (!newArtist.name) {
        alert("Vui lòng điền tên nghệ sĩ");
        setIsLoading(false);
        return;
      }

      // Gọi API thêm nghệ sĩ
      const response = await ArtistService.add({
        name: newArtist.name,
        bio: newArtist.bio,
        country: newArtist.country,
        profile_picture: files.image,
        is_active: true
      });

      if (!response.success) {
        throw new Error(response.message || "Có lỗi xảy ra khi thêm nghệ sĩ");
      }

      alert("Thêm nghệ sĩ thành công!");
      onSuccess?.();
      onClose();
    } catch (error) {
      alert(error.message || "Có lỗi xảy ra khi thêm nghệ sĩ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-700 w-[90%] max-w-md rounded-lg p-6 space-y-5 relative text-white">
          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files?.[0] }))
            }
          />

          {/* Image Upload Box */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-green-400">Image selected:</div>
                  <div className="text-xs text-gray-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 text-gray-400 text-2xl">📁</div>
                  <div className="text-sm text-gray-400 mb-2">
                    Upload profile picture
                  </div>
                  <div className="inline-block px-3 py-1 text-xs border border-gray-400 rounded">
                    Choose File
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              value={newArtist.name}
              onChange={(e) =>
                setNewArtist((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
              required
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              value={newArtist.bio}
              onChange={(e) =>
                setNewArtist((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
              rows="3"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <input
              type="text"
              value={newArtist.country}
              onChange={(e) =>
                setNewArtist((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
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
              {isLoading ? 'Adding...' : 'Add Artist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtistForm;