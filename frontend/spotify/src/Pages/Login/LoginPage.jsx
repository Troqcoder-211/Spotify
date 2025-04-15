import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#292929]">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng nhập vào Spotify
        </h2>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="px-2 text-gray-400">hoặc</span>
          <hr className="flex-grow border-gray-700" />
        </div>
        <input
          type="email"
          placeholder="Email hoặc tên người dùng"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <button className="w-full bg-green-500 text-black font-semibold py-2 rounded-full mb-4 border-2 border-transparent hover:border-white">
          Đăng nhập
        </button>
        <p className="text-gray-400 text-sm text-center">
          Chưa có tài khoản?{" "}
          <a href="#" className="hover:text-green-400 text-white">
            Đăng ký tại đây
          </a>
        </p>
      </div>
    </div>
  );
}
