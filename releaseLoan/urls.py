from django.urls import path
from . import views
from graphene_django.views import GraphQLView

urlpatterns = [
    path('api/releaseloans', views.ReleaseLoanView.as_view(), name='releaseloans'),
    path("releaseloans/graphql", GraphQLView.as_view(graphiql=True)),
]
