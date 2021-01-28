from rest_framework import serializers
from . models import ReleaseLoan
from loan.serializer import LoanSerializer

class ReleaseLoanSerializer(serializers.ModelSerializer): 
    #loan_no = LoanSerializer(many=False, read_only=True)
    class Meta: 
        model = ReleaseLoan 
        fields = ('s_no','loan_no','amt_collected','interest')
        
   
    