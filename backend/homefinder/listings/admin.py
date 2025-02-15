from django.contrib import admin
from .models import PropertyListing, PropertyImage, PropertyAmenity

@admin.register(PropertyListing)
class PropertyListingAdmin(admin.ModelAdmin):
    list_display = ['title', 'property_type', 'price', 'city', 'created_at']
    list_filter = ['property_type', 'city', 'state']
    search_fields = ['title', 'description', 'address']
    date_hierarchy = 'created_at'

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ['property', 'image_url', 'caption', 'created_at']
    list_filter = ['created_at']
    search_fields = ['property__title', 'caption']

@admin.register(PropertyAmenity)
class PropertyAmenityAdmin(admin.ModelAdmin):
    list_display = ['name', 'property', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description', 'property__title']
