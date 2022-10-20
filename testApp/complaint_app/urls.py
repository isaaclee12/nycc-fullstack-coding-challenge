from django.urls import path
from rest_framework import routers
from .views import generateTokens, UserViewSet, ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet

# Create a simple rest framework router
router = routers.SimpleRouter()

# NOTE: These urls extend the urls in testApp/urls.py on path /api/complaints/
# NOTE: Code below links classes in views.py to these server urls

# /api/complaints/
router.register(r'', ComplaintViewSet, basename='complaint')

# /api/complaints/users
router.register(r'users', ComplaintViewSet, basename='complaint')

# api/complaints/openCases
router.register(r'openCases', OpenCasesViewSet, basename='openCases')

# api/complaints/closedCases
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')

# api/complaints/closedCases
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')

# leave this empty in case we need to add any singular url to function maps
urlpatterns = [
    # api/complaints/generateTokens, which I only called once to generate token for everyone automatically.
    path('generateTokens/', generateTokens)
]

# Add all the router urls to the urlpatterns
urlpatterns += router.urls