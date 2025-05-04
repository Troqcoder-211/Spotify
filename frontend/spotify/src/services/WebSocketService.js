let wsInstance = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 5000;

const WebSocketService = {
  connect(conversationId, accessToken, onMessageReceived, onError, onConnect, onClose) {
    if (!conversationId || !accessToken) {
      console.error("Yêu cầu conversationId và accessToken");
      onError?.("Thiếu conversationId hoặc accessToken");
      return;
    }

    if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
      console.log("❗ WebSocket đã kết nối. Không tạo lại.");
      console.log(`WebSocket đã kết nối cho conversation ${conversationId}`);
      onConnect?.();
      return;
    }

    const url = `ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${accessToken}`;
    wsInstance = new WebSocket(url);

    wsInstance.onopen = () => {
      console.log(`Kết nối WebSocket thành công cho conversation ${conversationId}`);
      reconnectAttempts = 0;
      onConnect?.();
    };

    wsInstance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Tin nhắn mới:", data);
        // Sử dụng data.sender thay vì data.sender_id để đồng bộ với ChatConsumer
        onMessageReceived?.(data.message, data.sender_username, data.sender, data.sent_at);
      } catch (error) {
        console.error("Lỗi parse tin nhắn:", error);
        onError?.(`Lỗi parse tin nhắn: ${error.message}`);
      }
    };

    wsInstance.onerror = (error) => {
      console.error("Lỗi WebSocket:", error);
      onError?.(`Lỗi WebSocket: ${error.message || "Không xác định"}`);
    };

    wsInstance.onclose = (event) => {
      console.log(`WebSocket bị đóng: code=${event.code}, reason=${event.reason}`);
      onClose?.(event);
    };
  },

  sendMessage(conversationId, message) {
    if (!wsInstance || wsInstance.readyState !== WebSocket.OPEN) {
      console.error("WebSocket chưa kết nối hoặc đã đóng");
      return;
    }
    if (!message.trim()) {
      console.error("Tin nhắn không được để trống");
      return;
    }

    const payload = JSON.stringify({ message: message.trim() });
    wsInstance.send(payload);
    console.log(`Đã gửi tin nhắn: ${message}`);
  },

  disconnect() {
    if (wsInstance) {
      wsInstance.close(1000, "Ngắt kết nối bình thường");
      wsInstance = null;
      reconnectAttempts = 0;
      console.log("Đã ngắt kết nối WebSocket");
    }
  },

  isConnected() {
    return wsInstance?.readyState === WebSocket.OPEN || false;
  },
};

export default WebSocketService;