from rest_framework.views import APIView 
from rest_framework.response import Response 
from . serializer import ReleaseLoanSerializer
from .models import ReleaseLoan

# Create your views here.
class ReleaseLoanView(APIView): 
    
    serializer_class = ReleaseLoanSerializer 
  
    def get(self, request): 
        release_loans = [ {"Loan No": release_loans.s_no,"Loan Amt": release_loans.amt_collected}  
        for release_loans in ReleaseLoan.objects.all()] 
        return Response(release_loans) 
  
    def post(self, request): 
  
        serializer = ReleaseLoanSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 