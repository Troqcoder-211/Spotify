import React from "react";

const PremiumSection = () => {
  return (
    <div className="w-full text-white font-sans">
      {/* PHẦN TRÊN: Giới thiệu dùng thử Premium */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-center px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Nghe không giới hạn. Dùng thử gói <br className="hidden md:block" />
          Premium trong 2 tháng với giá 59.000 ₫.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Sau đó chỉ 59.000 ₫/tháng. Hủy bất cứ lúc nào.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition">
            Dùng thử 2 tháng với giá 59.000 ₫
          </button>
          <button className="border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-black transition">
            Xem tất cả các gói
          </button>
        </div>

        <p className="text-sm text-gray-200 mt-6 max-w-md mx-auto">
          59.000 ₫ cho 2 tháng, sau đó là 59.000 ₫/tháng. Chỉ áp dụng ưu đãi nếu
          bạn chưa từng dùng gói Premium.{" "}
          <a href="#" className="underline">
            Có áp dụng điều khoản.
          </a>
        </p>
      </div>

      {/* PHẦN GIỮA: Gói hợp túi tiền */}
      <div className="bg-black px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Gói hợp túi tiền cho mọi hoàn cảnh
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-6">
          Chọn một gói Premium để nghe nhạc không quảng cáo thỏa thích trên điện
          thoại, loa và các thiết bị khác. Thanh toán theo nhiều cách. Hủy bất
          cứ lúc nào.
        </p>

        {/* Logo thanh toán */}
        <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
          <img src="/images/momo.png" alt="Momo" className="h-8" />
          <img src="/images/visa.png" alt="Visa" className="h-8" />
          <img src="/images/mastercard.png" alt="MasterCard" className="h-8" />
          <img src="/images/amex.png" alt="Amex" className="h-8" />
        </div>
        <p className="mt-4 text-sm text-white/80 underline">
          + 3 phương thức khác
        </p>
      </div>

      {/* PHẦN DƯỚI: Lợi ích của các gói Premium */}
      <div className="bg-black px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Lợi ích của tất cả các gói Premium
        </h2>
        <ul className="text-left text-base space-y-3 max-w-md mx-auto">
          {[
            "Nghe nhạc không quảng cáo",
            "Tải xuống để nghe không cần mạng",
            "Phát nhạc theo thứ tự bất kỳ",
            "Chất lượng âm thanh cao",
            "Nghe cùng bạn bè theo thời gian thực",
            "Sắp xếp danh sách chờ nghe",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span>✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PHẦN GÓI: Individual (đã có) */}
      <div className="bg-black px-4 pb-12">
        <div className="bg-neutral-900 rounded-xl p-6 max-w-md mx-auto text-left">
          <span className="bg-pink-300 text-black text-sm font-semibold px-3 py-1 rounded-full">
            59.000 ₫ cho 2 tháng
          </span>

          <div className="mt-4 flex items-center gap-2">
            <img
              src="/images/spotify-icon.png"
              alt="Spotify"
              className="h-6 w-6"
            />
            <span className="text-pink-300 font-bold text-xl">Individual</span>
          </div>

          <p className="mt-2 text-white font-semibold">59.000 ₫ cho 2 tháng</p>
          <p className="text-sm text-white/70">Sau đó là 59.000 ₫/tháng.</p>

          <ul className="mt-4 text-white text-sm space-y-2 list-disc list-inside">
            <li>1 tài khoản Premium</li>
            <li>Hủy bất cứ lúc nào</li>
            <li>Đăng ký hoặc thanh toán một lần</li>
          </ul>

          <button className="mt-6 w-full bg-pink-300 text-black font-semibold py-3 rounded-full hover:bg-pink-200 transition">
            Dùng thử 2 tháng với giá 59.000 ₫
          </button>

          <p className="text-xs text-white/60 mt-4">
            59.000 ₫ cho 2 tháng, sau đó là 59.000 ₫/tháng. Chỉ áp dụng ưu đãi
            nếu bạn chưa từng dùng gói Premium.{" "}
            <a href="#" className="underline">
              Có áp dụng điều khoản.
            </a>
          </p>
        </div>
      </div>

      {/* PHẦN MỚI: Các gói Premium khác */}
      <div className="bg-black px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Khám phá các gói Premium khác
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Card: Premium Family */}
          <div className="bg-neutral-900 rounded-xl p-6 flex-1 max-w-sm">
            <h3 className="text-xl font-bold mb-2">Family</h3>
            <p className="text-sm text-gray-300 mb-4">
              Dành cho tối đa 6 thành viên.
            </p>
            <p className="text-lg font-semibold mb-2">79.000 ₫/tháng</p>
            <button className="w-full bg-pink-300 text-black font-semibold py-2 rounded-full hover:bg-pink-200 transition">
              Chọn gói Family
            </button>
          </div>

          {/* Card: Premium Student */}
          <div className="bg-neutral-900 rounded-xl p-6 flex-1 max-w-sm">
            <h3 className="text-xl font-bold mb-2">Student</h3>
            <p className="text-sm text-gray-300 mb-4">
              Ưu đãi dành cho sinh viên.
            </p>
            <p className="text-lg font-semibold mb-2">49.000 ₫/tháng</p>
            <button className="w-full bg-pink-300 text-black font-semibold py-2 rounded-full hover:bg-pink-200 transition">
              Chọn gói Student
            </button>
          </div>

          {/* Card: Premium Duo */}
          <div className="bg-neutral-900 rounded-xl p-6 flex-1 max-w-sm">
            <h3 className="text-xl font-bold mb-2">Duo</h3>
            <p className="text-sm text-gray-300 mb-4">
              Hai tài khoản cho đôi bạn thân.
            </p>
            <p className="text-lg font-semibold mb-2">69.000 ₫/tháng</p>
            <button className="w-full bg-pink-300 text-black font-semibold py-2 rounded-full hover:bg-pink-200 transition">
              Chọn gói Duo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSection;
