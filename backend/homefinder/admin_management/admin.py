from django.contrib import admin
from .models import NGOAssistance, GovernmentScheme

@admin.register(NGOAssistance)
class NGOAssistanceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'contact_info')
    search_fields = ('name', 'description')

@admin.register(GovernmentScheme)
class GovernmentSchemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'eligibility', 'description')
    search_fields = ('name', 'eligibility', 'description')
