from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields = ['username','email','address1','address2','city','state','pincode','birth_date','fathers_Name','occupation','remarks','reference','avatar'] 
   
    