from rest_framework import serializers
from .models import loan

class LoanSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = loan 
        fields = '__all__'
        
   
    