import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#292929]">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tạo tài khoản Spotify
        </h2>
        <input
          type="text"
          placeholder="Tên người dùng"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-600 focus:outline-none"
        />
        <button className="w-full bg-green-500 text-black font-semibold py-2 rounded-full mb-4 border-2 border-transparent hover:border-white">
          Tạo tài khoản
        </button>
        <p className="text-gray-400 text-sm text-center">
          Đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/login")}
            className="hover:text-green-400 text-white"
          >
            Đăng nhập tại đây
          </button>
        </p>
      </div>
    </div>
  );
}
