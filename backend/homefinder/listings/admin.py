from django.contrib import admin
from .models import PropertyListing, SavedListing

@admin.register(PropertyListing)
class PropertyListingAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'price', 'availability', 'owner')
    search_fields = ('title', 'location', 'owner__username')

@admin.register(SavedListing)
class SavedListingAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_property', 'saved_at')
    search_fields = ('user__username', 'property__title')

    def get_property(self, obj):
        return obj.property.title  # Ensure 'property' has a 'title' field

    get_property.short_description = 'Property'  # Renames column header in Django Admin
    get_property.admin_order_field = 'property__title'  # Enables sorting by property title
