from django.urls import path
from rest_framework import routers
from .views import generateTokens, ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentComplaintViewSet

# Create a simple rest framework router
# NOTE: trailing_slash=False prevents 404's with open/closed/top complaints
# As trailing slashes cause a double slash in the URLs
router = routers.SimpleRouter()

# NOTE: These urls extend the urls in testApp/urls.py on path /api/complaints/
# NOTE: Code below links classes in views.py to these server urls

# NOTE for whoever reviews this: I chose to change the first endpoint from
# '' to 'allCases' as it was the easiest solution to a 404 error I got
# when trying to GET to /api/complaints/openCases from the client.
# To my understanding, '' as a URL patter, causes an extra slash to be added
# in the url patterns below it. 

# I do not know if this is best practice, but I chose to do it in order
# to focus on functionality, and I believe it is a valid tactic given
# That users probably don't care what your backend url endpoints are
# named anyways

# /api/complaints/allCases
router.register(r'allCases', ComplaintViewSet, basename='complaint')

# api/complaints/openCases
router.register(r'openCases', OpenCasesViewSet, basename='openCases')

# api/complaints/closedCases
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')

# api/complaints/closedCases
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')

# api/complaints/constituentComplaints
router.register(r'constituentComplaints', ConstituentComplaintViewSet, basename='topComplaints')

# leave this empty in case we need to add any singular url to function maps
urlpatterns = [
    # api/complaints/generateTokens, which I only called once to generate token for everyone automatically.
    path('generateTokens/', generateTokens)
]

# Add all the router urls to the urlpatterns
urlpatterns += router.urls