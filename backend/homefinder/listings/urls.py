from django.urls import path
from .views import (
    PropertyListingList, 
    PropertyListingDetail, 
    PropertyImageList, 
    PropertyAmenityList
)

urlpatterns = [
    path('api/property-listings/', PropertyListingList.as_view(), name='property-listing-list'),
    path('api/property-listings/<int:pk>/', PropertyListingDetail.as_view(), name='property-listing-detail'),
    path('api/property-listings/<int:listing_id>/images/', PropertyImageList.as_view(), name='property-image-list'),
    path('api/property-listings/<int:listing_id>/amenities/', PropertyAmenityList.as_view(), name='property-amenity-list'),
]
