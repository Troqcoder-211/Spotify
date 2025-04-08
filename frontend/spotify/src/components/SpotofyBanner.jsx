import React from "react";

const SpotifyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white h-[10%] px-4 flex justify-between items-center rounded-lg">
      <div>
        <h2 className="font-bold">Xem trước Spotify</h2>
        <p className="text-sm">
          Đăng ký để nghe không giới hạn các bài hát và podcast với quảng cáo
          không thường xuyên. Không cần thẻ tín dụng.
        </p>
      </div>
      <button className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-md hover:transform hover:scale-105">
        Đăng ký miễn phí
      </button>
    </div>
  );
};

export default SpotifyBanner;
