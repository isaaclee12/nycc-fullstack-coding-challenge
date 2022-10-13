from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Automatically generate a token for every user
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# This reflects the "complaint_app_userprofile" table
class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  full_name = models.CharField(max_length=150, blank=True, default="")
  district = models.CharField(max_length=5, blank=True, default="")
  party = models.CharField(max_length=50, blank=True, default="", null=True)
  borough = models.CharField(max_length=50, blank=True, default="")
  def __str__(self):
    return str(self.user)
    
# This reflects the "complaint_app_complaint" table
class Complaint(models.Model):
  unique_key = models.CharField(max_length=150, blank=True, default="")
  account = models.CharField(max_length=10, blank=True, default="", null=True)
  opendate = models.DateField(blank=True, null=True)
  complaint_type = models.CharField(max_length=150, blank=True, default="", null=True)
  descriptor = models.CharField(max_length=150, blank=True, default="", null=True)
  zip = models.CharField(max_length=5, blank=True, default="", null=True)
  borough = models.CharField(max_length=50, blank=True, default="", null=True)
  city = models.CharField(max_length=50, blank=True, default="", null=True)
  council_dist = models.CharField(max_length=10, blank=True, default="", null=True)
  community_board = models.CharField(max_length=150, blank=True, default="", null=True)
  closedate = models.DateField(blank=True, null=True)
  def __str__(self):
    return str(self.unique_key)