# consumers.py
from channels.db import database_sync_to_async
from .models import Conversation, ConversationMember, Message
from django.contrib.auth.models import User
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
     async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.conversation_group_name = f"chat_{self.conversation_id}"

        # Lấy user từ scope
        self.user = self.scope["user"]

        # Kiểm tra xác thực
        if not self.user.is_authenticated:
            await self.close()
            return

        # Kiểm tra user có trong cuộc trò chuyện không
        is_member = await self.is_conversation_member()
        if not is_member:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.conversation_group_name,
            self.channel_name
        )

        await self.accept()

        async def disconnect(self, close_code):
            await self.channel_layer.group_discard(
                self.conversation_group_name,
                self.channel_name
            )

        async def receive(self, text_data):
            text_data_json = json.loads(text_data)
            message_content = text_data_json['message']

            conversation = await self.get_conversation()
            sender_member = await self.get_conversation_member()

            # Lưu tin nhắn
            message = await self.create_message(conversation, sender_member, message_content)

            await self.channel_layer.group_send(
                self.conversation_group_name,
                {
                    'type': 'chat_message',
                    'message': message.content,
                    'sender_id': sender_member.user.id,
                    'sender_username': sender_member.user.username,
                }
            )

        async def chat_message(self, event):
            await self.send(text_data=json.dumps({
                'message': event['message'],
                'sender_id': event['sender_id'],
                'sender_username': event['sender_username'],
            }))

        @database_sync_to_async
        def get_conversation(self):
            return Conversation.objects.get(conversation_id=self.conversation_id)

        @database_sync_to_async
        def get_conversation_member(self):
            return ConversationMember.objects.get(conversation_id=self.conversation_id, user=self.user)

        @database_sync_to_async
        def is_conversation_member(self):
            return ConversationMember.objects.filter(conversation_id=self.conversation_id, user=self.user).exists()

        @database_sync_to_async
        def create_message(self, conversation, sender_member, content):
            return Message.objects.create(
                conversation=conversation,
                sender=sender_member,
                content=content
            )