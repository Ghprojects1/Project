from django.db import models

# Create your models here.
class AccountBook(models.Model):
    s_no= models.IntegerField()
    amt = models.FloatField()
    isCredit = models.BinaryField()
    #mode_of_payment=models
    balance = models.FloatField()
    transaction_date = models.DateTimeField(auto_now=True)
    #user
    #loan_no

