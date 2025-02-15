from rest_framework import serializers
from .models import PropertyListing, PropertyImage, PropertyAmenity

class PropertyListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyListing
        fields = '__all__'

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = '__all__'

class PropertyAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAmenity
        fields = '__all__'
