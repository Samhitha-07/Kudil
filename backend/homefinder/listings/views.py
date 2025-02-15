from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import PropertyListing, PropertyImage, PropertyAmenity
from .serializers import PropertyListingSerializer, PropertyImageSerializer, PropertyAmenitySerializer

# Create your views here.

class PropertyListingList(APIView):
    def get(self, request):
        listings = PropertyListing.objects.all()
        serializer = PropertyListingSerializer(listings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PropertyListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertyListingDetail(APIView):
    def get_object(self, pk):
        try:
            return PropertyListing.objects.get(pk=pk)
        except PropertyListing.DoesNotExist:
            return None

    def get(self, request, pk):
        listing = self.get_object(pk)
        if listing is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PropertyListingSerializer(listing)
        return Response(serializer.data)

    def put(self, request, pk):
        listing = self.get_object(pk)
        if listing is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PropertyListingSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        listing = self.get_object(pk)
        if listing is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        listing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PropertyImageList(APIView):
    def get(self, request, listing_id):
        images = PropertyImage.objects.filter(property_id=listing_id)
        serializer = PropertyImageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request, listing_id):
        data = request.data.copy()
        data['property'] = listing_id
        serializer = PropertyImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertyAmenityList(APIView):
    def get(self, request, listing_id):
        amenities = PropertyAmenity.objects.filter(property_id=listing_id)
        serializer = PropertyAmenitySerializer(amenities, many=True)
        return Response(serializer.data)

    def post(self, request, listing_id):
        data = request.data.copy()
        data['property'] = listing_id
        serializer = PropertyAmenitySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
