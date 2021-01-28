from rest_framework.views import APIView 
from rest_framework.response import Response 
from . models import User
from . serializer import UserSerializer

# Create your views here.
class UserView(APIView): 
    
    serializer_class = UserSerializer 
  
    def get(self, request): 
        users = [ {"name": users.username,"detail": users.email}  
        for users in User.objects.all()] 
        return Response(users) 
  
    def post(self, request): 
  
        serializer = UserSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 