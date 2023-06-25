from rest_framework import serializers
from .models import Product,Agreement


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image','category','type_product','owner','count']

class AgreementSeralizer(serializers.ModelSerializer):

    class Meta:
        model = Agreement
        fields = '__all__'