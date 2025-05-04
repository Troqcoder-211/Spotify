from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models.Conversation import Conversation
from api.serializers.ConversationSerializer import ConversationSerializer

# Hiển thị danh sách cuộc trò chuyện
class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Lấy danh sách tất cả các cuộc trò chuyện"""
        conversations = Conversation.objects.filter(is_active=True)
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Tạo cuộc trò chuyện mới
class ConversationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Tạo một cuộc trò chuyện mới"""
        serializer = ConversationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            conversation = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Xoá cuộc trò chuyện
class DeleteConversationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, conversation_id):
        """Xoá cuộc trò chuyện"""
        conversation = get_object_or_404(Conversation, conversation_id=conversation_id)
        conversation.is_active = False
        conversation.save()
        return Response({"message": "Conversation deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
