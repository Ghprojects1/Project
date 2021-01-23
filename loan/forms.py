from django import forms
from django.contrib.auth.models import User


class LoanForm (forms.Form) : 
    user = forms.MultipleChoiceField()
    #User.objects.all
    loan_amt = forms.IntegerField()
    interest = forms.IntegerField()
    totalDue = forms.IntegerField()
    qty = forms.IntegerField()
    itemList = forms.CharField(max_length=200)
    status = forms.BooleanField()
    loan_date = forms.DateField()
    misc_charges = forms.FloatField()
    gross_wt = forms.FloatField()
    net_wt = forms.FloatField()