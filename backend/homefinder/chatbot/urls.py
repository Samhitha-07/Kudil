from django.urls import path
from .views import ChatRoomList, ChatRoomDetail, ChatMessageList

urlpatterns = [
    path('api/chat-rooms/', ChatRoomList.as_view(), name='chat-room-list'),
    path('api/chat-rooms/<int:pk>/', ChatRoomDetail.as_view(), name='chat-room-detail'),
    path('api/chat-rooms/<int:room_id>/messages/', ChatMessageList.as_view(), name='chat-message-list'),
]
