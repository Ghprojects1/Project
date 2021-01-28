from django.urls import path
from . import views

urlpatterns = [
    path('api/releaseloans', views.ReleaseLoanView.as_view(), name='releaseloans'),
]
