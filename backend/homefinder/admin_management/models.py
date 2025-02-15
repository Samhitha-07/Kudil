from django.db import models

class AdminProfile(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class GovernmentScheme(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    eligibility = models.TextField()
    link = models.URLField()

class NGOAssistance(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)
    description = models.TextField()
    website = models.URLField(blank=True, null=True)
