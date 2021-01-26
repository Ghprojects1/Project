from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.http import HttpResponseRedirect
from .forms import RegisterForm

from rest_framework.views import APIView 
from rest_framework.response import Response 
from . models import User
from . serializer import UserSerializer

# Create your views here.

def register(request):

    
    if request.method == "POST":
       
        email = request.POST["email"]
        password = request.POST["password"]
        name = request.POST["name"]
        username = request.POST["username"]

        user= User.objects.create(email=email, username= username, first_name= name)
        user.set_password(password)
        
        customerGroup = Group.objects.get(name='Customer') 
        customerGroup.user_set.add(user)
        
        user.address1 = request.POST["address1"]
        user.address2 = request.POST["address2"]
        user.city = request.POST["city"]
        user.state = request.POST["state"]
        user.pincode = request.POST["pincode"]
        #user.avatar = request.POST["avatar"]
        user.avatar = request.FILES["avatar"]
        user.save()


        return render(request, 'authentication/registered.html')
    else:
        #return render(request, 'authentication/register.html')
        form = RegisterForm()
        return render(request, 'authentication/register.html', {'form': form})
    """
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        #if form.is_valid():
        user= User.objects.create(email=form.cleaned_data['email'], username= form.cleaned_data['username'])
        user.set_password(form.cleaned_data['password'])
        
        customerGroup = Group.objects.get(name='Customer') 
        customerGroup.user_set.add(user)
        
        user.profile.address1 = form.cleaned_data['address1']
        user.profile.address2 = form.cleaned_data['address2']
        user.profile.city = form.cleaned_data['city']
        user.profile.state = form.cleaned_data['state']
        user.profile.pincode = form.cleaned_data['pincode']
        #user.profile.avatar = request.POST["avatar"]
        # user.profile.avatar = form.avatar
        form.save()
            # Get the current instance object to display in the template
        # img_obj = form.instance
        #  return render(request, 'register.html', {'form': form, 'img_obj': img_obj})
        return render(request, 'authentication/registered.html')
    else:
        form = RegisterForm()
        return render(request, 'authentication/register.html', {'form': form})
    """


def login_view(request):
    if request.method == 'POST':
        username = request.POST['email']
        password = request.POST['password']

        user= authenticate(username=username, password=password)

        if user is not None:
            login(request,user)
            return HttpResponseRedirect("/")

        else:
            return render(request, 'authentication/invalid.html')

    else:
        return render(request, 'authentication/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")

def update_profile(request, user_id):
    user = User.objects.get(pk=user_id)
    #user.profile.bio = 'Test'
    user.save()

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