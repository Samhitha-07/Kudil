from django.urls import path
from .views import AdminProfileList, AdminProfileDetail

urlpatterns = [
    path('api/admin-profiles/', AdminProfileList.as_view(), name='admin-profile-list'),
    path('api/admin-profiles/<int:pk>/', AdminProfileDetail.as_view(), name='admin-profile-detail'),
]
