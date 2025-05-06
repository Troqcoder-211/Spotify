import { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/img/assets';
import UsersList from './components/UserList';
import ChatHeader from './components/ChatHeader';
import MessageInput from './components/MessageInput';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import Conversation from '../../services/ConversationService';

const ChatPage = () => {
	const { user } = useSelector((state) => state.auth);
	const [users, setUsers] = useState([]);
	const messagesEndRef = useRef(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [messages, setMessages] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				setIsLoadingUsers(true);
				const response = await Conversation.getAllConversation();
				const data = response?.data;

				if (!Array.isArray(data)) {
					console.error('Dự kiến mảng, nhưng nhận được:', data);
					return;
				}

				const formattedUsers = data.map((conv) => ({
					_id: conv.conversation_id.toString(),
					clerkId: conv.conversation_id.toString(),
					fullName: conv.name || 'Không xác định',
					imageUrl: `https://i.pravatar.cc/150?u=${conv.conversation_id}`,
				}));

				setUsers(formattedUsers);
			} catch (error) {
				console.error('Lấy cuộc hội thoại thất bại:', error);
			} finally {
				setIsLoadingUsers(false);
			}
		};

		fetchConversations();
	}, []);

	const onlineUsers = new Set(['user2']);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		const fetchMessages = async () => {
			if (!selectedUser) {
				setMessages([]);
				return;
			}

			const response = await Conversation.getAllMessageByConversation({
				id: selectedUser.clerkId,
			});

			if (response.success && Array.isArray(response.data)) {
				const formattedMessages = response.data.map((msg) => ({
					_id: msg.message_id.toString(),
					senderId: msg.sender.toString(),
					content: msg.content,
					createdAt: msg.sent_at,
				}));

				setMessages(formattedMessages);
			} else {
				console.error('Không thể tải tin nhắn:', response);
				setMessages([]);
			}
		};

		fetchMessages();
	}, [selectedUser]);

	// Hàm xử lý nhận tin nhắn từ WebSocket
	const handleReceiveMessage = (content, senderUsername, senderId) => {
		console.log(content, senderUsername, senderId);
		const newMsg = {
			_id: Date.now().toString(),
			senderId: senderId ? senderId.toString() : 'unknown', // Xử lý khi senderId không tồn tại
			content,
			createdAt: new Date().toISOString(),
			senderName: senderUsername || 'Không xác định', // Thêm tên người gửi
		};

		// Kiểm tra trùng lặp trước khi thêm
		setMessages((prev) => {
			if (
				prev.some(
					(msg) =>
						msg.content === newMsg.content &&
						msg.senderId === newMsg.senderId &&
						Math.abs(new Date(msg.createdAt) - new Date(newMsg.createdAt)) <
							1000
				)
			) {
				return prev;
			}
			return [...prev, newMsg];
		});
	};

	return (
		<>
			<Navbar />
			<main className='h-[calc(100vh-10.5rem)] rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
				<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
					<UsersList
						users={users}
						selectedUser={selectedUser}
						isLoading={isLoadingUsers}
						setSelectedUser={setSelectedUser}
						onlineUsers={onlineUsers}
					/>

					<div className='flex flex-col h-[calc(100vh-9.5rem)]'>
						{selectedUser ? (
							<>
								<ChatHeader
									selectedUser={selectedUser}
									onlineUsers={onlineUsers}
								/>
								<div className='h-[calc(100vh-340px)] overflow-y-auto'>
									<div className='p-4 space-y-4'>
										{messages.map((message) => {
											const senderId = message.senderId?.toString();
											const currentUserId = user?.id?.toString();
											const isCurrentUser = senderId === currentUserId;

											return (
												<div
													key={message._id}
													className={`flex items-start gap-3 ${
														isCurrentUser ? 'flex-row-reverse' : ''
													}`}
												>
													<div
														className={`rounded-lg p-3 max-w-[70%] ${
															isCurrentUser ? 'bg-green-500' : 'bg-zinc-800'
														}`}
													>
														<p className='text-xs text-zinc-300 mb-1'>
															{message.senderName}
														</p>
														<p className='text-sm'>{message.content}</p>
														<span className='text-xs text-zinc-300 mt-1 block'>
															{formatTime(message.createdAt)}
														</span>
													</div>
												</div>
											);
										})}
									</div>
									<div ref={messagesEndRef} />
								</div>

								<MessageInput
									selectedUser={selectedUser}
									conversationId={selectedUser?.clerkId}
									onSend={handleReceiveMessage}
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
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img
			src={assets.spotify_logo}
			alt='Spotify'
			className='size-16 animate-bounce'
		/>
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>
				Chưa chọn cuộc hội thoại
			</h3>
			<p className='text-zinc-500 text-sm'>
				Chọn một người bạn để bắt đầu trò chuyện
			</p>
		</div>
	</div>
);

const formatTime = (dateString) => {
	return new Date(dateString).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
};
