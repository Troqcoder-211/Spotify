import { useRef, useState } from "react";

const AddAlbumDialog = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const handleImageSelect = (e) => {
    const fileInput = e.target;
    const file = fileInput?.files?.[0];
    if (file) {
      setImageFile(file);
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
                value={newAlbum.title}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                placeholder="Enter album title"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-white">Artist</label>
              <input
                type="text"
                value={newAlbum.artist}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, artist: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                placeholder="Enter artist name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-white">Release Year</label>
              <input
                type="number"
                value={newAlbum.releaseYear}
                onChange={(e) =>
                  setNewAlbum({
                    ...newAlbum,
                    releaseYear: parseInt(e.target.value),
                  })
                }
                min={1900}
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                className="px-4 py-2 border border-zinc-500 rounded text-white hover:bg-zinc-700"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded text-white bg-violet-500 hover:bg-violet-600">
                Add Album
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAlbumDialog;
