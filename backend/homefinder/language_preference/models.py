from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # Get the custom user model

class LanguagePreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = models.CharField(
        max_length=10,
        choices=[
            ("en", "English"),
            ("ta", "Tamil"),
            ("hi", "Hindi"),
        ],
        default="en",
    )

    def __str__(self):
        return f"{self.user.username} - {self.get_language_display()}"
