from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
from . serializer import InterestSerializer
from .models import Interest

# Create your views here.
class InterestView(APIView): 
    
    serializer_class = InterestSerializer 
  
    def get(self, request): 
        interests = [ {"name": interests.title,"detail": interests.percentage}  
        for interests in Interest.objects.all()] 
        return Response(interests) 
  
    def post(self, request): 
  
        serializer = InterestSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 