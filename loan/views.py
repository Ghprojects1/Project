from rest_framework.views import APIView 
from rest_framework.response import Response 
from . serializer import LoanSerializer
from .models import loan

# Create your views here.
class LoanView(APIView): 
    
    serializer_class = LoanSerializer 
  
    def get(self, request): 
        loans = [ {"Loan No": loans.loan_no,"Loan Amt": loans.loan_amt }  
        for loans in loan.objects.all()] 
        return Response(loans) 
  
    def post(self, request): 
  
        serializer = LoanSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 