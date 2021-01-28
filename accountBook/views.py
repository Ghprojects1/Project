from rest_framework.views import APIView 
from rest_framework.response import Response 
from . models import AccountBook
from . serializer import AccountBookSerializer

# Create your views here.
class AccountBookView(APIView): 
    
    serializer_class = AccountBookSerializer 
  
    def get(self, request): 
        entries = [ {"Amount": entries.amt,"Credit": entries.entry}  
        for entries in AccountBook.objects.all()] 
        return Response(entries) 
  
    def post(self, request): 
  
        serializer = AccountBookSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 