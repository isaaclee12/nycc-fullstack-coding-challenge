from django.urls import path
from rest_framework import routers
from .views import UserViewSet, ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet

# Create a simple rest framework router
router = routers.SimpleRouter()

# NOTE: These urls extend the urls in testApp/urls.py on path /api/complaints/
# NOTE: Code below links classes in views.py to these server urls

# /api/complaints/
router.register(r'', ComplaintViewSet, base_name='complaint')

# /api/complaints/users
router.register(r'users', ComplaintViewSet, base_name='complaint')

# api/complaints/openCases
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')

# api/complaints/closedCases
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')

# api/complaints/closedCases
router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')

# leave this empty in case we need to add any singular url to function maps
urlpatterns = [
]

# Add all the router urls to the urlpatterns
urlpatterns += router.urls