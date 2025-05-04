# conversation_member_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models.Conversation import Conversation
from api.models.ConversationMember import ConversationMember
from api.models.User import User
from api.serializers.ConversationMemberSerializer import ConversationMemberSerializer

# Thêm thành viên vào nhóm chat
class AddConversationMemberView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, conversation_id):
        """Thêm thành viên vào cuộc trò chuyện"""
        conversation = get_object_or_404(Conversation, conversation_id=conversation_id)
        user = request.data.get("user")  # Thông tin user được thêm vào
        user_obj = get_object_or_404(User, id=user)
        
        # Kiểm tra nếu người dùng đã là thành viên của cuộc trò chuyện này
        if ConversationMember.objects.filter(conversation=conversation, user=user_obj).exists():
            return Response({"error": "User is already a member of this conversation."}, status=status.HTTP_400_BAD_REQUEST)

        # Thêm thành viên
        member = ConversationMember.objects.create(conversation=conversation, user=user_obj)
        member_serializer = ConversationMemberSerializer(member)
        return Response(member_serializer.data, status=status.HTTP_201_CREATED)

       