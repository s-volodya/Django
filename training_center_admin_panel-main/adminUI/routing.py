from django.urls import re_path,path
from . import consumers

websocket_urlpatterns=[
    #  re_path(r'ws/chat/(?P<room_name>\w+)/$',consumers.ChatConsumer.as_asgi())
      path("ws/chat/<chat_id>/", consumers.ChatConsumer.as_asgi ()),
      path("ws/chat/<chat_id>/is_tayping/", consumers.Chat_tayping_Consumer.as_asgi ()),
      path("ws/chat/<chat_id>/actions/", consumers.Chat_actions_Consumer.as_asgi ()),
]
