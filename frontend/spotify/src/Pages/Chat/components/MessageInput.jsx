import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import TokenService from "../../../services/TokenService";
import WebSocketService from "../../../services/WebSocketService";

const MessageInput = ({ selectedUser, conversationId, onSend }) => {
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const accessToken = user?.accessToken || TokenService.getAccessToken();

  useEffect(() => {
    if (!conversationId || !accessToken) {
      setError("Yêu cầu conversationId và accessToken");
      return;
    }

    if (!WebSocketService.isConnected()) {
      WebSocketService.connect(
        conversationId,
        accessToken,
        (message, senderUsername, senderId) => {
          // Không lọc senderId nữa, để server broadcast xử lý
          onSend(message, senderUsername, senderId);
        },
        (err) => {
          setError(err);
        },
        () => {
          setError(null);
        },
        // (event) => {
        //   setError(`Kết nối WebSocket bị đóng: ${event.reason || "Không xác định"}`);
        // }
      );
    }

    return () => {
      if (WebSocketService.isConnected()) {
        WebSocketService.disconnect();
      }
    };
  }, [conversationId, accessToken, onSend]);

  const handleSend = useCallback(() => {
    if (isSending || !selectedUser || !user || !newMessage.trim()) return;

    setIsSending(true);
    console.log("Gửi tin nhắn:", newMessage);
    WebSocketService.sendMessage(conversationId, newMessage);
    setNewMessage("");
    setTimeout(() => setIsSending(false), 500);
  }, [isSending, selectedUser, user, newMessage, conversationId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.repeat) {
      e.preventDefault();
      handleSend();
    }
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
          onKeyDown={handleKeyDown}
          className="bg-zinc-800 border-none flex-1 p-2 rounded-md text-white placeholder:text-zinc-400"
        />
        <button
          onClick={handleSend}
          disabled={isSending || !newMessage.trim()}
          className="bg-blue-500 text-white px-3 py-2 rounded-md disabled:opacity-50 transition-colors"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessageInput;