from rest_framework import serializers
from ..models import Message
from django.contrib.auth.models import User


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.user.username', read_only=True)

    class Meta:
        model = Message
        fields = ['message_id', 'conversation', 'sender', 'sender_username', 'content', 'sent_at', 'is_active']
