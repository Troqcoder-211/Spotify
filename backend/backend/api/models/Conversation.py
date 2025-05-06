from django.db import models

class Conversation(models.Model):
    conversation_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'conversation'

    def __str__(self):
        return self.name or f"Conversation {self.conversation_id}"
