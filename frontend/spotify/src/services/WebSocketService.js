let wsInstance = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 5000; // 5 giây

const WebSocketService = {
  // Khởi tạo và kết nối WebSocket
  connect(conversationId, accessToken, onMessageReceived, onError, onConnect, onClose) {
    if (!conversationId || !accessToken) {
      console.error("Yêu cầu conversationId và accessToken");
      onError?.("Thiếu conversationId hoặc accessToken");
      return;
    }

    // Nếu đã có kết nối, không tạo mới
    if (wsInstance && wsInstance.readyState === WebSocket.OPEN) {
      console.log(`WebSocket đã kết nối cho conversation ${conversationId}`);
      onConnect?.();
      return;
    }

    // Tạo WebSocket mới
    const url = `ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${accessToken}`;
    wsInstance = new WebSocket(url);

    // Xử lý khi kết nối mở
    wsInstance.onopen = () => {
      console.log(`Kết nối WebSocket thành công cho conversation ${conversationId}`);
      reconnectAttempts = 0; // Reset số lần thử reconnect
      onConnect?.();
    };

    // Xử lý tin nhắn nhận được
    wsInstance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Tin nhắn mới:", data);
        onMessageReceived?.(data.message, data.sender_username, data.sender_id);
      } catch (error) {
        console.error("Lỗi parse tin nhắn:", error);
        onError?.(`Lỗi parse tin nhắn: ${error.message}`);
      }
    };

    // Xử lý lỗi
    wsInstance.onerror = (error) => {
      console.error("Lỗi WebSocket:", error);
      onError?.(`Lỗi WebSocket: ${error.message || "Không xác định"}`);
    };

    // Xử lý khi kết nối đóng
    wsInstance.onclose = (event) => {
      console.log(`WebSocket bị đóng: code=${event.code}, reason=${event.reason}`);
      onClose?.(event);
      
      // Thử reconnect nếu chưa vượt quá số lần tối đa
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`Thử kết nối lại lần ${reconnectAttempts} sau ${reconnectDelay}ms...`);
        setTimeout(() => {
          this.connect(conversationId, accessToken, onMessageReceived, onError, onConnect, onClose);
        }, reconnectDelay);
      } else {
        console.error("Đã vượt quá số lần thử reconnect tối đa");
        onError?.("Không thể kết nối lại WebSocket");
      }
    };
  },

  // Gửi tin nhắn
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

  // Ngắt kết nối
  disconnect() {
    if (wsInstance) {
      wsInstance.close(1000, "Ngắt kết nối bình thường");
      wsInstance = null;
      reconnectAttempts = 0;
      console.log("Đã ngắt kết nối WebSocket");
    }
  },

  // Kiểm tra trạng thái kết nối
  isConnected() {
    return wsInstance?.readyState === WebSocket.OPEN || false;
  },
};

export default WebSocketService;