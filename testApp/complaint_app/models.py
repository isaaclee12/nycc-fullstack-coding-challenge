from hashlib import blake2b # Method to encrypt passwords, faster than SHA-3
from django.db import models # Basic model object framework thing

from django.contrib.auth.models import User # "User" object from Django's authentication system 
# NOTE: Fields of this "User" object match fields in the "auth_user" table


from django.conf import settings # Imports settings.py

from django.db.models.signals import post_save # This is a signal that's triggered after we save anything to the database using save()

from django.dispatch import receiver # This is what recieves the signal "post_save"

# Below is generic example code of what you can run if the post_save signal is triggered

# @reciever(post_save)
# def dbSaveCallback(sender, **kwargs):
#   print("Successfully saved to backend.")

# Token handler for Token authentiation
# (See: https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication)
from rest_framework.authtoken.models import Token 

# NOTE: Token handler requires CORS and Authentication vars to be modified in the
# HTTP Header using Django's middleware features
# (See: https://docs.djangoproject.com/en/4.1/topics/http/middleware/#writing-your-own-middleware)
# (And: https://stackoverflow.com/questions/36099244/how-to-add-an-http-header-to-all-django-responses)
# You'll need to modify the response's HTTP headers using material from the request then return the response
# e.g. 'GET' call from frontend

# How to generate token for user:
# token = Token.objects.create(user=[Insert User Object Here, I Think])

"""
For clients to authenticate, the token key should be included in the Authorization HTTP header.
The key should be prefixed by the string literal "Token", with whitespace separating the two strings.
For example:

Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b

"""

# The models below are native python objects that will reflect the data in the sqlite db tables

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