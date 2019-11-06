from django.contrib import admin
from trips.models import Trip
from trips.models import Service
from trips.models import ServiceType


class TripsAdmin(admin.ModelAdmin):
    # display the trips list by the title
    list_display = ("title", )
    # allow for trips to be searched by the title, duration in days and cost
    search_fields = ["title", "duration_days", "cost"]

admin.site.register(Trip,TripsAdmin)
admin.site.register(ServiceType)
admin.site.register(Service)
