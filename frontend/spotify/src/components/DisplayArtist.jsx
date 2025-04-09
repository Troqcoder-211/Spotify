const DisplayArtist = () => {
  const artist = {
    name: "MONO",
    image: "link-to-artist-image",
    monthlyListeners: "852.900 người nghe hàng tháng",
    popularSongs: [
      {
        title: "Chăm Hoa",
        plays: "15.086.601",
        duration: "3:31",
        image: "link-to-song-image-1",
      },
      {
        title: "Em Xinh",
        plays: "18.863.240",
        duration: "3:03",
        image: "link-to-song-image-2",
      },
      {
        title: "Em Là",
        plays: "20.521.411",
        duration: "3:17",
        image: "link-to-song-image-3",
      },
      {
        title: "Waiting For You",
        plays: "26.171.596",
        duration: "4:26",
        image: "link-to-song-image-4",
      },
      {
        title: "Đi Tìm Tình Yêu",
        plays: "4.165.673",
        duration: "3:23",
        image: "link-to-song-image-5",
      },
    ],
    spotlight: {
      title: "MONO: Spotlight",
      image: "link-to-spotlight-image",
      description: '"Chăm Hoa" - OUT NOW',
    },
  };

  return (
    <div className="bg-gradient-to-b from-green-600 to-black min-h-screen p-4 text-white">
      <div className="flex items-center space-x-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-blue-400">Nghệ sĩ được xác minh</p>
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          <p className="text-gray-300">{artist.monthlyListeners}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button className="bg-green-500 px-6 py-2 rounded-full font-semibold">
          ▶ Theo dõi
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Phổ biến</h2>
        <div className="mt-2 space-y-2">
          {artist.popularSongs.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-gray-400 text-sm">{song.plays}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{song.duration}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Lựa chọn của nghệ sĩ</h2>
        <div className="mt-2 bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
          <img
            src={artist.spotlight.image}
            alt={artist.spotlight.title}
            className="w-24 h-24 rounded-md"
          />
          <div>
            <p className="text-gray-300 text-sm">
              {artist.spotlight.description}
            </p>
            <p className="text-lg font-semibold">{artist.spotlight.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayArtist;
