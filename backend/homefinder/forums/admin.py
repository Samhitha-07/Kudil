from django.contrib import admin
from .models import Forum, ForumSubscription, Post, Comment

@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name', 'description')

@admin.register(ForumSubscription)
class ForumSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'forum', 'subscribed_at')
    search_fields = ('user__username', 'forum__name')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'forum', 'created_at')
    search_fields = ('content', 'author__username', 'forum__name')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')
    search_fields = ('content', 'author__username', 'post__content')
