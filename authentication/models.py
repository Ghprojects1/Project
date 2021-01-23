from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
"""
#for MongoDB FileStorage
from django.conf import settings
from djongo.storage import GridFSStorage


# Define your GridFSStorage instance 
grid_fs_storage = GridFSStorage(collection='my_files', base_url=''.join([settings.BASE_URL, 'my_files/']))
"""
# Create your models here.
class User(AbstractUser):
    address1 = models.TextField(max_length=100, blank=True)
    address2 = models.TextField(max_length=100, blank=True)
    city = models.CharField(max_length=30, blank=True)
    state = models.CharField(max_length=30, blank=True)
    pincode = models.IntegerField()
    birth_date = models.DateField(null=True, blank=True)
    fathers_Name = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=50, blank=True)
    remarks = models.CharField(max_length=50, blank=True)
    reference = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(null=True, upload_to='Customer_Photo')
    #Avatar = models.ImageField(upload_to='authors', storage=grid_fs_storage)

#class Profile(models.Model):
    
    
"""
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    """