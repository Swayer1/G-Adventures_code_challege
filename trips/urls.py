from django.urls import path
from .views import TripList, TripDetailView, TripServiceList, AddServiceToTrip, UpdateTripCost, ServiceTypeList

urlpatterns = [    
    # return json for all trips main information
    path('', TripList.as_view()),
    # return json for a specific trip by id full information
    path('<pk>/new/', AddServiceToTrip.as_view()),
    path('<pk>/types/', ServiceTypeList.as_view()),
    path('<pk>/cost/', UpdateTripCost.as_view()),
    path('<pk>', TripDetailView.as_view()),
]
