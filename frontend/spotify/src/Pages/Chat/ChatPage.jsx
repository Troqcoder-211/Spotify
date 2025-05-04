import { useState, useEffect } from "react";
import { assets } from "../../assets/img/assets";

import UsersList from "./components/UserList";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";


import Conversation from "../../services/ConversationService";

const ChatPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);

  // console.log(setUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);


  useEffect(() => {
  const fetchConversations = async () => {
    try {
      setIsLoadingUsers(true);
      const response = await Conversation.getAllConversation();

      // console.log("API response:", response); // log kiểm tra

      const data = response?.data;

      if (!Array.isArray(data)) {
        console.error("Expected an array, but got:", data);
        return;
      }

      const formattedUsers = data.map((conv) => ({
        _id: conv.conversation_id.toString(),
        clerkId: conv.conversation_id.toString(),
        fullName: conv.name || "Unknown",
        imageUrl: `https://i.pravatar.cc/150?u=${conv.conversation_id}`,
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  fetchConversations();
}, []);


  // Giả lập danh sách user online (sử dụng Set)
  const onlineUsers = new Set(["user2"]);

  // Giả lập fetchUsers: thay cho việc gọi API, ta chỉ delay 1s rồi tắt loading
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) {
        setMessages([]);
        return;
      }
  
      const response = await Conversation.getAllMessageByConversation({
        id: selectedUser.clerkId, // clerkId chính là conversation_id
      });

      // console.log(selectedUser.clerkId);
      // console.log(response);
  
      if (response.success && Array.isArray(response.data)) {
        const formattedMessages = response.data.map((msg) => ({
          _id: msg.message_id.toString(),
          senderId: msg.sender.toString(),
          content: msg.content,
          createdAt: msg.sent_at,
        }));
  
        setMessages(formattedMessages);
      } else {
        console.error("Không thể load messages:", response);
        setMessages([]);
      }
    };
  
    fetchMessages();
  }, [selectedUser]);
  

  // Hàm gửi tin nhắn
  const handleSendMessage = async (content) => {
    console.log('hi');
    if (!selectedUser) return;
  
    try {
      // Gửi tin nhắn tới server
      const response = await Conversation.sendMessageByUserInConversation({
        id: selectedUser.clerkId, // đây là conversation_id
        content: content,
      });
  
      if (response.success) {
        const newMsg = {
          _id: Date.now().toString(), // hoặc lấy từ response nếu có
          senderId: user.id,
          content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
      } else {
        console.error("Gửi tin nhắn thất bại:", response);
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };
  
console.log(messages)
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-10.5rem)] rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
          <UsersList
            users={users}
            selectedUser={selectedUser}
            isLoading={isLoadingUsers}
            setSelectedUser={setSelectedUser}
            onlineUsers={onlineUsers}
          />

          {/* Phần tin nhắn chat */}
          <div className="flex flex-col h-[calc(100vh-9.5rem)] ">
            {selectedUser ? (
              <>
                <ChatHeader
                  selectedUser={selectedUser}
                  onlineUsers={onlineUsers}
                />

                {/* Khu vực cuộn danh sách tin nhắn */}
                <div className="h-[calc(100vh-340px)] overflow-y-auto">
                  <div className="p-4 space-y-4">
                  {messages.map((message) => {
                    const senderId = message.senderId?.toString();
                    const currentUserId = user?.id?.toString();
                    const isCurrentUser = senderId === currentUserId;

                    // console.log("senderId:", senderId, "currentUserId:", currentUserId, "==>", isCurrentUser);

                    return (
                      <div
                        key={message._id}
                        className={`flex items-start gap-3 ${!isCurrentUser ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            !isCurrentUser ? "bg-green-500" : "bg-zinc-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  </div>
                </div>

                <MessageInput 
                  selectedUser={selectedUser}
                  // user={user}
                  conversationId={selectedUser?.clerkId}
                  onSend={handleSendMessage}
                />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatPage;
const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img
      src={assets.spotify_logo}
      alt="Spotify"
      className="size-16 animate-bounce"
    />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
