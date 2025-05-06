
from django.urls import re_path
from . import consumers

# Định tuyến WebSocket cho các cuộc trò chuyện (chỉ định conversation_id trong URL)
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<conversation_id>\d+)/$', consumers.ChatConsumer.as_asgi()),
]
