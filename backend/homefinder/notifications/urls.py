from django.urls import path
from .views import NotificationList, NotificationDetail

urlpatterns = [
    path('api/notifications/', NotificationList.as_view(), name='notification-list'),
    path('api/notifications/<int:pk>/', NotificationDetail.as_view(), name='notification-detail'),
]
