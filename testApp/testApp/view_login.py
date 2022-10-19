from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action

from django.http import HttpResponse
from django.contrib.auth import authenticate


# Post-handler for login
# @action(methods=['post'], detail=True)

def retrieveLoginResult(request):

    # Use django's built in auth function to authenticate creds
    user = authenticate(username=request.username, password=request.password)

    if user is not None:
        # A backend authenticated the credentials
        return True

    else:
        # No backend authenticated the credentials
        return False
