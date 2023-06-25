from django.db import models
from django.contrib.auth.models import User


    
class Product(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=0)
    stock = models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)
    category = models.CharField(null=True,default=None,max_length=40)
    type_product = models.CharField(max_length=10,default='B')
    owner = models.ForeignKey(User,on_delete=models.CASCADE,default=None,null=True)
    count = models.IntegerField(default=1)


    def __str__(self):
        return self.name
    

class Agreement(models.Model):
    client = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    comment = models.CharField(max_length=100)
    accepted = models.BooleanField(default=False)
    product_id = models.IntegerField(unique=True)
    document = models.FileField(null=True,blank=True)


    def __str__(self) -> str:
        return f'{self.client.username} is {self.accepted}'