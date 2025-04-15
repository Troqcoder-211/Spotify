import React, { useState } from "react";

const Avatar = ({ src, alt, fallback }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-medium">{fallback}</span>
      )}
    </div>
  );
};

const ChatHeader = ({ selectedUser, onlineUsers }) => {
  if (!selectedUser) return null;

  const isOnline =
    onlineUsers && onlineUsers.has
      ? onlineUsers.has(selectedUser.clerkId)
      : false;

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar
          src={selectedUser.imageUrl}
          alt={selectedUser.fullName}
          fallback={selectedUser.fullName[0]}
        />
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p className="text-sm text-zinc-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
