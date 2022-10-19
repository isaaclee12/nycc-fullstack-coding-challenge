from http.client import HTTPResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action

from django.http.response import JsonResponse
from django.contrib.auth import authenticate

from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer


class ComplaintViewSet(viewsets.ModelViewSet):

  http_method_names = ['get']

  def list(self, request):
    
    # Get all complaints from the user's district, i.e. Read method
    # Get all of the data for complaints via the Complain model (This automatically pulls from the SQL DB via Django's ORM)
    # complaint_list = Complaint.objects.all()

    # # The serializer here is basically the ORM that pulls the data from SQLite.
    # complaint_serializer = ComplaintSerializer(complaint_list, context={"request": request}, many=True)

    # # Send it as a JsonResponse for React to process
    # response = JsonResponse(complaint_serializer.complaint_list, safe=False) # safe = false tells django that this is a valid format

    # response = JsonResponse(
    #   {
    #     "test": 1
    #   }
    # )

    response = HTTPResponse("testing")

    # Set HTTP Headers for the response to whitelist on CORS and such
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    # response["Access-Control-Allow-Methods"] = "GET"
    # response["Access-Control-Max-Age"] = "1000"
    # response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"

    print(response)

    return response


class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):

    # Get only the open complaints from the user's district
    # SQL_request("SELECT * FROM tablename WHERE COUNCILMEMBER ID = [Id number from login] AND OPEN = true")


    return Response()

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):

    # Get only complaints that are close from the user's district
        # SQL_request("SELECT * FROM tablename WHERE COUNCILMEMBER ID = [Id number from login] AND OPEN = false")
    
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):

    # Get the top 3 complaint types from the user's district
    # SQL_request("SELECT * FROM tablename WHERE COUNCILMEMBER ID = [Id number from login] AND OPEN = true")

    return Response()