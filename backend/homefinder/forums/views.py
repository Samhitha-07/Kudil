from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import ForumPost, ForumComment
from .serializers import ForumPostSerializer, ForumCommentSerializer

# Create your views here.

class ForumPostList(APIView):
    def get(self, request):
        posts = ForumPost.objects.all()
        serializer = ForumPostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ForumPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForumPostDetail(APIView):
    def get_object(self, pk):
        try:
            return ForumPost.objects.get(pk=pk)
        except ForumPost.DoesNotExist:
            return None

    def get(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ForumPostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ForumPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ForumCommentList(APIView):
    def get(self, request, post_id):
        comments = ForumComment.objects.filter(post_id=post_id)
        serializer = ForumCommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, post_id):
        data = request.data.copy()
        data['post'] = post_id
        serializer = ForumCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
