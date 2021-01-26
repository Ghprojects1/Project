from django.db import models

# Create your models here.
amt = models.FloatField()
entry = models.BinaryField()
balance = models.FloatField()
transaction_date = models.DateTimeField(auto_now=True)
