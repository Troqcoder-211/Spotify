from django.db import models
from .ConversationMember import ConversationMember

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    conversation = models.ForeignKey(
        ConversationMember,
        on_delete=models.CASCADE,
        related_name='conversation_messages'
    )
    sender = models.ForeignKey(
        ConversationMember,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['sent_at']
        db_table = 'message'
