from rest_framework import serializers
from trips.models import Trip, Service, ServiceType

class TripServiceSerializer(serializers.ModelSerializer):
    type = serializers.SlugRelatedField(queryset = ServiceType.objects.all(), slug_field='name')
    
    class Meta:
        model = Service
        fields = (
            "id",
            "trip",
            "name",
            "location",
            "cost",
            "type",
            "accommodation_check_in",
            "accommodation_check_out"
        )


class TripCostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Service
        fields = (
            "cost",
        )


class TripDetailViewSerializer(serializers.ModelSerializer):
    services = TripServiceSerializer(many=True)

    class Meta:
        model = Trip
        fields = (
            "cost",
            "destination",
            "duration_days",
            "id",
            "title",
            "travel_style",
            "services",
        )


class TripListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields =  (
            "title",
            "id",
        )


class ServiceTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields =  (
            "name",
        )
