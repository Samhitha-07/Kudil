from django.db import models

class LanguagePreference(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ta', 'Tamil'),
        ('hi', 'Hindi'),
        ('te', 'Telugu'),
        ('ml', 'Malayalam'),
        ('kn', 'Kannada'),
    ]
    
    user_id = models.CharField(max_length=255)  # We can link this to User model later
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_id} - {self.get_language_display()}"

    class Meta:
        unique_together = ['user_id', 'language']
