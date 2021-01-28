from django.db import models
from loan.models import loan

# Create your models here.
class ReleaseLoan(models.Model):
    s_no= models.IntegerField()
    loan_no= models.ForeignKey(loan, on_delete=models.PROTECT)
    amt_collected = models.FloatField()
    interest = models.FloatField()
