from rest_framework import serializers
from api.models.Conversation import Conversation
from api.models.ConversationMember import ConversationMember

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'

    def create(self, validated_data):
        # Tạo cuộc trò chuyện
        conversation = Conversation.objects.create(**validated_data)

        # Lấy người dùng từ context và tạo thành viên
        request = self.context.get('request')
        if request and request.user:
            ConversationMember.objects.create(conversation=conversation, user=request.user)

        return conversation
