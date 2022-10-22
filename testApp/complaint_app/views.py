# This is the API code that handles REST requests/responses

# HTTPResponse allows you to HTML as a response 
from http.client import HTTPResponse
from unicodedata import category

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
from .serializers import UserProfileSerializer, ComplaintSerializer

# This is used for the "Count" method in TopComplaints
from django.db.models import Count
# from django.db.models import OrderBy

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


# This function gets the district number for based on the user's token
"""NOTE for reviewer: I understand that this may be inefficient in practice,
as this does involve quite a number of calls to the backend. The reason I did
it this was in order to prevent the passing of credentials (username or pwd) to
the API. I would appreciate feedback as to what would actually be best practice here.
"""

def getDistrictNum(request):
    # Note: all the SQL statements in comments below aren't necessarily syntactically correct, they're more pseudocode

    # get token from request
    token = request.META.get('HTTP_AUTHORIZATION')

    # Trim the string to remove the "Token " part of the Authorization header
    # And leave just the numerical part
    token = token[6:]

    # SQL: SELECT * FROM authtoken_token WHERE key = token
    tokenData = Token.objects.filter(key__exact = token).get()
    user_id = tokenData.user_id

    # SQL: CouncilPersonWhoseComplaintsWeWant = SELECT * FROM auth_user WHERE username = request.data
    councilperson = UserProfile.objects.filter(id__exact = user_id).get()

    # Get district num from JSON of single row
    districtNum = councilperson.district

    # Append single digit district numbers with a 0 to account for format in complaints table
    if len(districtNum) == 1:
      districtNum = "0" + districtNum

    # Append district number with "NYCC" to account for format in complaints table
    districtNum = "NYCC" + districtNum

    return districtNum


# This function encapsulates the code necessary to get the full dataset for all future viewsets
def getComplaintDataset(request):

    districtNum = getDistrictNum(request)

    # Get rows from complaints table where account = districtNum from token
    complaints = Complaint.objects.filter(account__exact = districtNum)

    # Return a queryset that can be worked with all non-default viewsets for complaints
    return complaints


class ComplaintViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']
  
  def list(self, request):

    complaintsQueryset = getComplaintDataset(request)

    # Serialize it.
    serializer = ComplaintSerializer(complaintsQueryset, many=True)

    # Return the data
    return Response(serializer.data)


class OpenCasesViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']

  def list(self, request):

    complaintsQueryset = getComplaintDataset(request)

    # Get rows from complaints table where account = districtNum from token, and where closedate IS NULL, i.e. open
    complaintsQueryset = complaintsQueryset.filter(closedate__isnull=True)

    # Serialize that data
    open_complaints_serializer = ComplaintSerializer(complaintsQueryset, many=True)

    # Send it as a response
    return Response(open_complaints_serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):

    complaintsQueryset = getComplaintDataset(request)

    # Get rows from complaints table where account = districtNum from token, and where closedate IS NOT NULL
    complaintsQueryset = complaintsQueryset.filter(closedate__isnull=False)
    
    # Serialize that data
    closed_complaints_serializer = ComplaintSerializer(complaintsQueryset, many=True)

    # Send it as a response
    return Response(closed_complaints_serializer.data)
    
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  def list(self, request):

    complaintsQueryset = getComplaintDataset(request)

    # Get top 3 complaints_list: .values gets just the values from the complaint_type col, then we get a column of the count for ea. type, then we order by those frequency, then we just get top 3 with [:3]
    top_complaints_list = complaintsQueryset.values('complaint_type').annotate(count = Count('complaint_type')).order_by('-count')[:3]

    # 'id'
    print(type(top_complaints_list))
    
    for i in top_complaints_list:
      print(i)

    # Send it as a response
    return Response(top_complaints_list)

class ConstituentComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  def list(self, request):

    """Create new endpoint and viewset that should return all complaints 
    that were made by constituents that live in the logged in council 
    member’s district. (i.e., John Doe is the Council Member for District 1, 
    and he clicks on the new button. His dashboard table now only shows 
    complaints where conucil_dist is NYCC01)."""

    # Get district number
    districtNum = getDistrictNum(request)

    # Get rows that match the council_district in the complaints_app_complaints table
    constituent_complaints_list = Complaint.objects.filter(council_dist__exact = districtNum)

    # Serialize it
    constituent_complaints_serializer = ComplaintSerializer(constituent_complaints_list, many=True)

    # Send it back to the client
    return Response(constituent_complaints_serializer.data)