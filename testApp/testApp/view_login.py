from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action

from django.http.response import JsonResponse
from django.contrib.auth import authenticate

from .view_login import LoginViewSet


# Post-handler for login
@action(methods=['post'], detail=True)

class LoginViewSet(viewsets.ModelViewSet):
  def retrieve(self, request):
    user = authenticate(username=request.username, password=request.password)
    if user is not None:
        # A backend authenticated the credentials
        return True
    else:
        # No backend authenticated the credentials
        return False
