from django.urls import path
from . import views
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('api/releaseloans', views.ReleaseLoanView.as_view(), name='releaseloans'),
    path("releaseloans/graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
