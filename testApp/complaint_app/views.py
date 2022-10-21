# This is the API code that handles REST requests/responses

# HTTPResponse allows you to HTML as a response 
from http.client import HTTPResponse

# Viewsets = class-based views that use "list" and "create" instead of "get"
# Status = set of status codes e.g. 404, 200
from rest_framework import viewsets, status

# Response = response that can be rendered into multiple content types for ease 
from rest_framework.response import Response
 
from rest_framework.parsers import JSONParser

from rest_framework.decorators import (action, api_view)

from django.contrib.auth.models import User

# from django.http.response import JsonResponse
from django.contrib.auth import authenticate

from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer

# This is the Token model.
from rest_framework.authtoken.models import Token

# Function that only needs to be run once to generate tokens for all users in the auth_user table.
@api_view(('GET',))
def generateTokens(request):
  # The code below generates tokens for all users, may only need to run this once:
  try:
    for user in User.objects.all():
        Token.objects.get_or_create(user=user)
        print("Generated token for user:", user)
    return Response("Sucessfully generated tokens for all users")
  except:
    return Response("Error: Could not generate tokens")

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class ComplaintViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']
  
  def list(self, request):

    # Note: all the commented SQL statements below aren't necessarily correct, they're more pseudocode if anything

    # get token from request
    token = request.META.get('HTTP_AUTHORIZATION')

    # Trim the string to remove the "Token " part of the Authorization header
    # And leave just the numerical part
    token = token[6:]

    # SQL: SELECT * FROM authtoken_token WHERE key = token
    tokenData = Token.objects.filter(key__exact = token).get()
    user_id = tokenData.user_id

    # SQL: CouncilPersonWhoseComplaintsWeWant = SELECT * FROM auth_user WHERE username = request.data
    councilperson = UserProfile.objects.filter(id = user_id).get()

    # Get district num from JSON of single row
    districtNum = councilperson.district

    # Append single digit district numbers with a 0 to account for format in complaints table
    if len(districtNum) == 1:
      districtNum = "0" + districtNum

    # Append district number with "NYCC" to account for format in complaints table
    districtNum = "NYCC" + districtNum

    # Get rows from complaints table where account = districtNum from token
    complaints = Complaint.objects.filter(account__exact = districtNum)

    # Serialize it.
    serializer = ComplaintSerializer(complaints, many=True)

    return Response(serializer.data)


class OpenCasesViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']

  def list(self, request):

    # Get only the open complaints from the user's district,
    # i.e. the entries with no closing dates
    # SQL: SELECT * FROM complaints_app_complaints WHERE closedate = NULL
    open_complaints_list = Complaint.objects.filter(closedate__isnull)

    # Serialize that data
    open_complaints_serializer = ComplaintSerializer(open_complaints_list, many=True)

    # Send it as a response
    return Response(self.open_complaints_serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):

    # Get only complaints that are closed from the user's district
    # i.e. the entries WITH closing dates, which will always be of the datatype "date"
    # SQL: SELECT * FROM complaints_app_complaints WHERE typeof(closedate) = date <- this is not how it's done in SQL, just treat this as pseudocode so that people can understand how this code works
    closed_complaints_list = Complaint.objects.filter(closedate__date)

    # Serialize that data
    closed_complaints_serializer = ComplaintSerializer(closed_complaints_list, many=True)

    # Send it as a response
    return Response(self.closed_complaints_serializer.data)
    
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):

    # Get the top 3 complaint types from the user's district
    # SQL_request("SELECT * FROM tablename WHERE COUNCILMEMBER ID = [Id number from login] AND OPEN = true")

    return Response()