import React, { useRef, useState } from "react";
const AddSongForm = ({ albums = [], onClose }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const [files, setFiles] = useState({ image: null, audio: null });
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    duration: "",
    album: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("🎵 New song submitted:", { ...newSong, files });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      {/* Hidden Inputs */}
      <input
        type="file"
        accept="audio/*"
        ref={audioInputRef}
        hidden
        onChange={(e) =>
          setFiles((prev) => ({ ...prev, audio: e.target.files?.[0] }))
        }
      />
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
              <div className="text-sm text-gray-400 mb-2">Upload artwork</div>
              <div className="inline-block px-3 py-1 text-xs border border-gray-400 rounded">
                Choose File
              </div>
            </>
          )}
        </div>
      </div>

      {/* Audio Upload Button */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Audio File</label>
        <button
          type="button"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-left"
          onClick={() => audioInputRef.current?.click()}
        >
          {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
        </button>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={newSong.title}
          onChange={(e) =>
            setNewSong((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        />
      </div>

      {/* Artist */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Artist</label>
        <input
          type="text"
          value={newSong.artist}
          onChange={(e) =>
            setNewSong((prev) => ({ ...prev, artist: e.target.value }))
          }
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Duration (seconds)</label>
        <input
          type="number"
          min="0"
          value={newSong.duration}
          onChange={(e) =>
            setNewSong((prev) => ({
              ...prev,
              duration: e.target.value || "0",
            }))
          }
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        />
      </div>

      {/* Album Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Album (Optional)</label>
        <select
          value={newSong.album}
          onChange={(e) =>
            setNewSong((prev) => ({ ...prev, album: e.target.value }))
          }
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="">-- Select Album --</option>
          <option value="none">No Album (Single)</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault(); // không submit form
            onClose(); // <- gọi hàm từ prop
          }}
          type="submit"
          className="w-40 bg-red-600 hover:bg-red-500 text-white py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-40   bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
        >
          Submit Song
        </button>
      </div>
    </form>
  );
};

export default AddSongForm;
