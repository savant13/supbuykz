from .models import Product,Agreement
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ProductSerializer,AgreementSeralizer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes


class ProductView(APIView):

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):

    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateView(APIView):

    permission_classes = ()

    def post(self, request):
        user = request.user
        data = request.data

        user = User.objects.filter(id=data['owner']).first()
       
        product = {
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock":True,
            "image": data["image"],
            "category":data['category'],
            "type_product":data['type_product'],
            "owner":user
        }


        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductDeleteView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return Response({"detail": "Product successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class ProductEditView(APIView):
    
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(id=pk)
        
        updated_product = {
            "name": data["name"] if data["name"] else product.name,
            "description": data["description"] if data["description"] else product.description,
            "price": data["price"] if data["price"] else product.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else product.image,
        }

        serializer = ProductSerializer(product, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AgreementCreateView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def post(self,request):
        data = request.data
        client = User.objects.get(data['client'])
        agreement_data = {
            "client":client,
            "comment":data['comment'],
            "accepted":data['accepted'],
            "document":data['document'],
            'product_id':data['product_id']
        }

        serializer = AgreementSeralizer(data=agreement_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class AgreementEditView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def put(self,request,pk):
        data = request.data
        agreement = Agreement.objects.get(id=pk)
    
        
        updated_agreement = {
            "accepted":data['accepted']
        }

        serializer = AgreementSeralizer(agreement, data=updated_agreement)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


        