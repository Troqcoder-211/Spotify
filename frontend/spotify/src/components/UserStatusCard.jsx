import React from "react";
// Ví dụ ở đây dùng lucide-react để lấy icon, bạn có thể thay thế icon theo nhu cầu
import { UserIcon } from "lucide-react";

const UserStatusCard = ({ avatarUrl, displayName, status }) => {
  return (
    <div className="flex items-center p-3 bg-zinc-800 rounded-md cursor-pointer hover:bg-zinc-700 transition-colors w-full">
      {/* Avatar */}
      <div className="w-10 h-10 relative overflow-hidden rounded-full bg-zinc-700 flex items-center justify-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon className="text-zinc-300 w-5 h-5" />
        )}
      </div>

      {/* Thông tin người dùng */}
      <div className="ml-3 flex flex-col">
        <div className="text-sm font-medium text-white">{displayName}</div>

        {status && (
          <div
            className={`flex items-center gap-1 text-xs  ${
              status == "Online" ? "text-green-500" : "text-zinc-400"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusCard;
