from django import forms


class RegisterForm (forms.Form) : 
    username = forms.CharField(label = 'PhoneNumber', max_length=11)
    password=forms.CharField(widget = forms.PasswordInput())
    email=forms.EmailField()
    name=forms.CharField(max_length=25)
    address1 = forms.CharField(max_length=100)
    address2 = forms.CharField(max_length=100)
    city = forms.CharField(max_length=30)
    state = forms.CharField(max_length=30)
    pincode = forms.CharField(max_length=6)
    birth_date = forms.DateField()
    avatar = forms.ImageField()