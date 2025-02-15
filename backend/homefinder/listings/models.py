from django.db import models
from users.models import CustomUser

class PropertyListing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    availability = models.BooleanField(default=True)
    images = models.ImageField(upload_to="property_images/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class SavedListing(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    listing = models.ForeignKey(PropertyListing, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
