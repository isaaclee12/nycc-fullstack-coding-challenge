# This is the API code that handles REST requests/responses

# HTTPResponse allows you to HTML as a response 
from http.client import HTTPResponse

# Viewsets = class-based views that use "list" and "create" instead of "get"
# Status = set of status codes e.g. 404, 200
from rest_framework import viewsets, status

# Response = response that can be rendered into multiple content types for ease 
from rest_framework.response import Response
# 
from rest_framework.parsers import JSONParser

from rest_framework.decorators import action

from django.contrib.auth.models import User

# from django.http.response import JsonResponse
from django.contrib.auth import authenticate

from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer

from rest_framework.authtoken.models import Token

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class ComplaintViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']
  
  def list(self, request):

    # Get all complaints from the user's district, i.e. Read method
    # Get all of the data for complaints via the Complain model (This automatically pulls from the SQL DB via Django's ORM)
    # SQL: SELECT * FROM complaints_app_complaints
    complaint_list = Complaint.objects.all()

    # The serializer here is basically the ORM that pulls the data from SQLite.
    complaint_serializer = ComplaintSerializer(complaint_list, many=True)

    # Send it as a JsonResponse for React to process
    return Response(self.complaint_serializer.data) # safe = false tells django that this is a valid format


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