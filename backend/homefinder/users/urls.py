from django.urls import path
from .views import (
    UserProfileList, 
    UserProfileDetail, 
    UserPreferenceList, 
    UserPreferenceDetail
)

urlpatterns = [
    path('api/user-profiles/', UserProfileList.as_view(), name='user-profile-list'),
    path('api/user-profiles/<int:pk>/', UserProfileDetail.as_view(), name='user-profile-detail'),
    path('api/user-preferences/', UserPreferenceList.as_view(), name='user-preference-list'),
    path('api/user-preferences/<int:pk>/', UserPreferenceDetail.as_view(), name='user-preference-detail'),
]
