from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics

from trips.models import Trip, Service, ServiceType
from trips.serializers import TripDetailViewSerializer, TripServiceSerializer, TripListSerializer, TripCostSerializer, ServiceTypeListSerializer


# This could be done also via viewsets but for this example I am not using it.

class TripList(generics.ListAPIView):
    """
    A list of all trips, read-only
    """
    queryset = Trip.objects.all()
    serializer_class = TripListSerializer


class ServiceTypeList(generics.ListAPIView):
    """
    A list of all service types, read-only
    """
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeListSerializer


class TripDetailView(generics.RetrieveAPIView):
    """
    Details for a trip
    """
    queryset = Trip.objects.all()
    serializer_class = TripDetailViewSerializer

    
class AddServiceToTrip(generics.CreateAPIView):
    """
    Add service to a trip
    """
    queryset = Trip.objects.all()
    serializer_class = TripServiceSerializer


class UpdateTripCost(generics.UpdateAPIView):
    """
    Add service to a trip
    """
    queryset = Trip.objects.all()
    serializer_class = TripCostSerializer


class TripServiceList(generics.RetrieveAPIView):
    """
    List of services for a trip
    """
    queryset = Service.objects.all()
    serializer_class = TripServiceSerializer
