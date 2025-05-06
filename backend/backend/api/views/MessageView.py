# message_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models import Message, Conversation
from api.serializers.MessageSerializer import MessageSerializer

# Lấy lịch sử tin nhắn của một cuộc trò chuyện
class ConversationMessageHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, conversation_id):
        """Lấy lịch sử tin nhắn của cuộc trò chuyện"""
        conversation = get_object_or_404(Conversation, conversation_id=conversation_id, is_active=True)
        messages = Message.objects.filter(conversation=conversation, is_active=True)
        message_serializer = MessageSerializer(messages, many=True)
        return Response(message_serializer.data, status=status.HTTP_200_OK)

# Đánh dấu tin nhắn đã đọc
class MarkMessageAsReadView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, message_id):
        """Đánh dấu tin nhắn đã đọc"""
        message = get_object_or_404(Message, message_id=message_id)
        message.is_read = True
        message.save()
        return Response({"message": "Message marked as read"}, status=status.HTTP_200_OK)
    
# Gửi tin nhắn mới
class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, conversation_id):
        """Gửi một tin nhắn mới trong cuộc trò chuyện"""
        conversation = get_object_or_404(Conversation, conversation_id=conversation_id, is_active=True)
        
        # Lấy dữ liệu tin nhắn từ request
        message_content = request.data.get("message")
        
        if not message_content:
            return Response({"error": "Message content is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Tạo một tin nhắn mới
        message = Message.objects.create(
            conversation=conversation,
            sender=request.user,  # Người gửi là người đã đăng nhập
            message=message_content,
            is_active=True
        )
        
        # Serialize dữ liệu để trả về
        message_serializer = MessageSerializer(message)
        
        return Response(message_serializer.data, status=status.HTTP_201_CREATED)

# Xoá tin nhắn
class DeleteMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, message_id):
        """Xoá tin nhắn"""
        message = get_object_or_404(Message, message_id=message_id)
        message.is_active = False
        message.save()
        return Response({"message": "Message deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
