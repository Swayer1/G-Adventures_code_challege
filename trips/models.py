from django.db import models
from django.utils import timezone

class Trip(models.Model):
    title = models.CharField(
        max_length=300,
        unique=True,
        help_text="The name of the trip",
    )
    travel_style = models.CharField(
        max_length=300,
        help_text="The type of G Adventures trip",
    )
    destination = models.CharField(
        max_length=300,
        help_text="Initial location of the trip",
    )
    cost = models.IntegerField(help_text="Total cost of the trip")
    duration_days = models.IntegerField(default=0 ,help_text="How many days this trip runs")

    def __str__(self):
        return self.title


# Services types

class ServiceType(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


# Blueprint of services for a trip

class Service(models.Model):
    trip = models.ForeignKey(Trip, related_name='services', on_delete=models.CASCADE)
    name = models.CharField(
        max_length=300,
        unique=False,
        help_text="The name of the service",
    )
    location = models.CharField(
        max_length=300,
        help_text="The location of the service",
    )
    accommodation_check_in = models.DateField(name="accommodation_check_in")
    accommodation_check_out = models.DateField(name="accommodation_check_out")
    type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)
    cost = models.IntegerField(help_text="Total cost of the service")

    def __str__(self):
        return '%s: %s' % (self.type, self.name)