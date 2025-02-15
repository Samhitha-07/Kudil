from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import LanguagePreference
from .serializers import LanguagePreferenceSerializer

# Create your views here.

class LanguagePreferenceList(APIView):
    def get(self, request):
        preferences = LanguagePreference.objects.all()
        serializer = LanguagePreferenceSerializer(preferences, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LanguagePreferenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LanguagePreferenceDetail(APIView):
    def get_object(self, pk):
        try:
            return LanguagePreference.objects.get(pk=pk)
        except LanguagePreference.DoesNotExist:
            return None

    def get(self, request, pk):
        preference = self.get_object(pk)
        if preference is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LanguagePreferenceSerializer(preference)
        return Response(serializer.data)

    def put(self, request, pk):
        preference = self.get_object(pk)
        if preference is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LanguagePreferenceSerializer(preference, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        preference = self.get_object(pk)
        if preference is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        preference.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
