from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer


# TODO: Remove the below code BEFORE finalizing project for security reasons.
from django.views.decorators.csrf import csrf_exempt; 
@csrf_exempt

# Create your views here.


# TODO: This is the API part.

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  def list(self, request):
    
    # Get all complaints from the user's district

    # SQL_request("SELECT * FROM tablename WHERE COUNCILMEMBER ID = [Id number from login]")

    # Read method
    if request.method == "GET":

      # Get all of the data for complaints via the Complain model (This automatically pulls from the SQL DB via Django's ORM)
      complaint_list = Complaint.objects.all()

      # The serializer here is basically the ORM that pulls the data from SQLite.
      complaint_serializer = ComplaintSerializer(complaint_list, context={"request": request}, many=True)

      # Send it as a JsonResponse for React to process
      return JsonResponse(complaint_serializer.complaint_list, safe=False) # safe = false tells django that this is a valid format

    elif request.method == "POST":

      # Get the request from the client
      complaint_data_requested = JSONParser().parse(request)

      # Use the serializer to make an ORM request based off the Client request
      complaint_serializer = ComplaintSerializer(data=complaint_data_requested)

      # If the ORM request is valid... 
      if complaint_serializer.is_valid():

        # Save the data in the request to the SQLite3 DB
        complaint_serializer.save()

        # return success message
        return JsonResponse("Successfully Added Data to Complaints Data Table", safe=False)
      
      # If not valid, response w/ error msg
      return JsonResponse("Failed to Add Data to Complaints Data Table", safe=False)

  # Random note to self: no put or delete methods necessary per the specs, focus on pushing working products to specifications.

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