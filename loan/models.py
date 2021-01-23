from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

# Create your models here.
class loan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    loan_no = models.CharField(max_length=6 ,primary_key = True)
    loan_amt = models.FloatField()
    interest = models.ForeignObject
    totalDue = models.FloatField()
    qty = models.IntegerField()
    itemList = models.CharField(max_length=200)
    status = models.BooleanField()
    loan_date = models.DateField()
    misc_charges = models.FloatField()
    gross_wt = models.FloatField()
    net_wt = models.FloatField()


