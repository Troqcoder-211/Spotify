import { useState, useEffect } from "react";
import { assets } from "../../assets/img/assets";

import UsersList from "./components/UserList";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import Navbar from "../../components/Navbar";

const ChatPage = () => {
  // Dữ liệu giả lập cho user hiện tại, danh sách người dùng và tin nhắn
  const [currentUser] = useState({
    id: "user1",
    fullName: "Alice",
    imageUrl: "https://i.pravatar.cc/150?img=1",
  });

  const [users, setUsers] = useState([
    {
      _id: "1",
      clerkId: "user2",
      fullName: "Bob",
      imageUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      clerkId: "user3",
      fullName: "Charlie",
      imageUrl: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  console.log(setUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Giả lập danh sách user online (sử dụng Set)
  const onlineUsers = new Set(["user2"]);

  // Giả lập fetchUsers: thay cho việc gọi API, ta chỉ delay 1s rồi tắt loading
  useEffect(() => {
    setIsLoadingUsers(true);
    const timer = setTimeout(() => {
      setIsLoadingUsers(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Khi chọn user, giả lập fetch messages (sau 0.5 giây)
  useEffect(() => {
    if (selectedUser) {
      const timer = setTimeout(() => {
        setMessages([
          {
            _id: "m1",
            senderId: currentUser.id,
            content: "Hi there!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "m2",
            senderId: selectedUser.clerkId,
            content: "Hello!",
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setMessages([]);
    }
  }, [selectedUser, currentUser.id]);

  // Hàm gửi tin nhắn
  const handleSendMessage = (content) => {
    const newMsg = {
      _id: Date.now().toString(),
      senderId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

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
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-start gap-3 ${
                          message.senderId === currentUser.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        {/* <Avatar
                          src={
                            message.senderId === currentUser.id
                              ? currentUser.imageUrl
                              : selectedUser.imageUrl
                          }
                          alt="avatar"
                          fallback={
                            message.senderId === currentUser.id
                              ? currentUser.fullName[0]
                              : selectedUser.fullName[0]
                          }
                          className="w-10 h-10"
                        /> */}
                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            message.senderId === currentUser.id
                              ? "bg-green-500"
                              : "bg-zinc-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <MessageInput onSend={handleSendMessage} />
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
