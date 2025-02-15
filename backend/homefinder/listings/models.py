from django.db import models
from users.models import CustomUser

class PropertyListing(models.Model):
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('land', 'Land'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    bedrooms = models.IntegerField(null=True, blank=True)
    bathrooms = models.IntegerField(null=True, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    owner_name = models.CharField(max_length=255)
    owner_contact = models.CharField(max_length=20)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(PropertyListing, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    caption = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.title}"

class PropertyAmenity(models.Model):
    property = models.ForeignKey(PropertyListing, related_name='amenities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.property.title}"

    class Meta:
        verbose_name_plural = "Property Amenities"

class SavedListing(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    listing = models.ForeignKey(PropertyListing, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
