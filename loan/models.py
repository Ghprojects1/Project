from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
#from interest.models import Interest

# Create your models here.
class Loan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    loan_no = models.CharField(max_length=6 ,primary_key = True)
    loan_amt = models.FloatField()
    #interest = models.ForeignKey(Interest, on_delete=models.PROTECT)
    totalDue = models.FloatField()
    qty = models.IntegerField()
    itemList = models.CharField(max_length=200)
    status = models.BooleanField(default=True,blank=True,null=True)
    loan_date = models.DateField(blank=True,null=True)
    misc_charges = models.FloatField(blank=True,null=True)
    gross_wt = models.FloatField(blank=True,null=True)
    net_wt = models.FloatField(blank=True,null=True)
    #purity = models.FloatField(blank=True,null=True)


