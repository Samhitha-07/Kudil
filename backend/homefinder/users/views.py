from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import UserProfile, UserPreference
from .serializers import UserProfileSerializer, UserPreferenceSerializer

# Create your views here.

class UserProfileList(APIView):
    def get(self, request):
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileDetail(APIView):
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return None

    def get(self, request, pk):
        profile = self.get_object(pk)
        if profile is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, pk):
        profile = self.get_object(pk)
        if profile is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        profile = self.get_object(pk)
        if profile is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserPreferenceList(APIView):
    def get(self, request):
        preferences = UserPreference.objects.all()
        serializer = UserPreferenceSerializer(preferences, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserPreferenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPreferenceDetail(APIView):
    def get_object(self, pk):
        try:
            return UserPreference.objects.get(pk=pk)
        except UserPreference.DoesNotExist:
            return None

    def get(self, request, pk):
        preference = self.get_object(pk)
        if preference is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserPreferenceSerializer(preference)
        return Response(serializer.data)

    def put(self, request, pk):
        preference = self.get_object(pk)
        if preference is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserPreferenceSerializer(preference, data=request.data)
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
