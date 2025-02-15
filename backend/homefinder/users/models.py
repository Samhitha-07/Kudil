from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_buyer = models.BooleanField(default=False)
    is_seller = models.BooleanField(default=False)

class UserProfile(models.Model):
    USER_TYPES = [
        ('tenant', 'Tenant'),
        ('owner', 'Property Owner'),
        ('agent', 'Real Estate Agent'),
    ]
    
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class UserPreference(models.Model):
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('land', 'Land'),
    ]
    
    user = models.ForeignKey(UserProfile, related_name='preferences', on_delete=models.CASCADE)
    preferred_location = models.CharField(max_length=255)
    min_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    max_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, null=True, blank=True)
    min_bedrooms = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Preferences for {self.user.username}"
