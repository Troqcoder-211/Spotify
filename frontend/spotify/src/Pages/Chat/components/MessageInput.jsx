import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TokenService from "../../../services/TokenService";
import WebSocketService from "../../../services/WebSocketService";

const MessageInput = ({ selectedUser, conversationId, onSend }) => {
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const accessToken = user?.accessToken || TokenService.getAccessToken();

  useEffect(() => {
    if (!conversationId || !accessToken) {
      setError("Yêu cầu conversationId và accessToken");
      return;
    }

    // Kết nối WebSocket
    WebSocketService.connect(
      conversationId,
      accessToken,
      (message, senderUsername, senderId) => {
        onSend(message, senderUsername, senderId); // Cập nhật UI
      },
      (err) => {
        setError(err); // Lưu lỗi để hiển thị
      },
      () => {
        setError(null); // Xóa lỗi khi kết nối thành công
      },
      (event) => {
        setError(`Kết nối WebSocket bị đóng: ${event.reason || "Không xác định"}`);
      }
    );

    // Ngắt kết nối khi component unmount
    return () => {
      WebSocketService.disconnect();
    };
  }, [conversationId, accessToken, onSend]);

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage.trim()) return;
    WebSocketService.sendMessage(conversationId, newMessage);
    setNewMessage("");
  };

  return (
    <div className="p-4 mt-5 border-t border-zinc-800">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn"
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
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessageInput;