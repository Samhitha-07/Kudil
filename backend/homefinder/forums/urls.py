from django.urls import path
from .views import ForumPostList, ForumPostDetail, ForumCommentList

urlpatterns = [
    path('api/forum-posts/', ForumPostList.as_view(), name='forum-post-list'),
    path('api/forum-posts/<int:pk>/', ForumPostDetail.as_view(), name='forum-post-detail'),
    path('api/forum-posts/<int:post_id>/comments/', ForumCommentList.as_view(), name='forum-comment-list'),
]
