# This file registers our module into Django's admin interface as model objects.
# Admin is the web interface ("localhost:8000/admin") where you can fiddle wit the data
from django.contrib import admin
from complaint_app.models import UserProfile, Complaint, User

# Here, we register our data models to that interface.
# Register your models here.
admin.site.register(Complaint)
admin.site.register(UserProfile)