from django.db import models
from loan.models import Loan

# Create your models here.
class Interest(models.Model):
    title = models.CharField(max_length=50)
    percentage = models.FloatField()
    loan_amt_min = models.FloatField()
    loan_amt_max = models.FloatField()
    status = models.BinaryField(default=True,blank=True,null=True)
    created_date = models.DateField( auto_now=True)
    