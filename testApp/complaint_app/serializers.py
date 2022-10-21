from django.contrib.auth.models import User
from .models import UserProfile, Complaint, Token

# These are serializers, i.e. the things that make 
# wacky SQL data into Python read-able data and vice versa
# Pretty self explanitory

from rest_framework import serializers
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'last_login', 'is_superuser', 'username', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'first_name')
        # Add encryption to password, and make it write only so it can't be read by get requests
        # TODO: Uncomment and Comment as needed for debugging
        extra_kwags = {'password': {'write_only': True, 'required': True}}

class UserProfileSerializer(serializers.ModelSerializer):
    # TODO: BONUS Task: Flatten out the User object inside of UserProfile.
    class Meta:
        model = UserProfile
        fields = ('id','user','full_name','district','party','borough')

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ('unique_key','account','opendate','complaint_type','descriptor','zip','borough','city','council_dist','community_board','closedate')