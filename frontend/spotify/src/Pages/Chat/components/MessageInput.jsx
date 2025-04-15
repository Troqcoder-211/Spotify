import React, { useState } from "react";

const MessageInput = ({ selectedUser, user, sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    // Kiểm tra nếu không có người dùng được chọn, không có thông tin người dùng hoặc tin nhắn rỗng thì không gửi.
    if (!selectedUser || !user || !newMessage.trim()) return;
    // Gửi tin nhắn qua hàm callback được truyền vào props
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="p-4 mt-5 border-t border-zinc-800 ">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-zinc-800 border-none flex-1 p-2 rounded-md text-white placeholder:text-zinc-400"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="bg-blue-500 text-white px-3 py-2 rounded-md disabled:opacity-50 transition-colors"
        >
          {/* Bạn có thể thay nội dung "Send" bằng icon nếu muốn */}
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
