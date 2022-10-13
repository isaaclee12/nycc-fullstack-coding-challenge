from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet

# NOTE: These urls extend the urls in testApp/urls.py
router = routers.SimpleRouter()

# /api/complaints/
router.register(r'', ComplaintViewSet, base_name='complaint')

# api/complaints/openCases
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')

# api/complaints/closedCases
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')

# api/complaints/closedCases
router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')

urlpatterns = [
    
]

urlpatterns += router.urls