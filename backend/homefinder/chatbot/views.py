from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import ChatMessage, ChatRoom
from .serializers import ChatMessageSerializer, ChatRoomSerializer

# Create your views here.

class ChatRoomList(APIView):
    def get(self, request):
        rooms = ChatRoom.objects.all()
        serializer = ChatRoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChatRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatRoomDetail(APIView):
    def get_object(self, pk):
        try:
            return ChatRoom.objects.get(pk=pk)
        except ChatRoom.DoesNotExist:
            return None

    def get(self, request, pk):
        room = self.get_object(pk)
        if room is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ChatRoomSerializer(room)
        return Response(serializer.data)

class ChatMessageList(APIView):
    def get(self, request, room_id):
        messages = ChatMessage.objects.filter(room_id=room_id)
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, room_id):
        data = request.data.copy()
        data['room'] = room_id
        serializer = ChatMessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
