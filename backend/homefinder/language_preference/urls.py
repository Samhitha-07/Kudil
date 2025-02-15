from django.urls import path
from .views import LanguagePreferenceList, LanguagePreferenceDetail

urlpatterns = [
    path('api/language-preferences/', LanguagePreferenceList.as_view(), name='language-preference-list'),
    path('api/language-preferences/<int:pk>/', LanguagePreferenceDetail.as_view(), name='language-preference-detail'),
]
