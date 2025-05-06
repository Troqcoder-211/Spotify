from rest_framework import serializers
from api.models.ConversationMember import ConversationMember
from django.contrib.auth.models import User


class ConversationMemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ConversationMember
        fields = ['id', 'conversation', 'user', 'username', 'joined_at', 'is_active']


