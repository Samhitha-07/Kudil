from django.db import models

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
