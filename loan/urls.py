from django.urls import path
from . import views

urlpatterns = [
    path('api/loans', views.LoanView.as_view(), name='loans'),
]
