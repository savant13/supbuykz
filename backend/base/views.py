from django.shortcuts import render
from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from django.db.models import Q 
from . import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product,CustomUser,Category,Notification,Order,Agreement
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password, check_password

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer


@api_view(['GET'])
def profile(request,pk):
    user = User.objects.get(id = pk)
    cust_user = CustomUser.objects.get(user =user)
    user_info = {**serializers.UserSerializer(user).data,**serializers.CustomUserSerializer(cust_user).data}
    

    return Response(user_info)



@api_view(['GET'])
def all_categories(request):
    categories = Category.objects.all()
    serial_categories = serializers.CategorySerializer(categories,many = True)
    return Response(serial_categories.data)



@api_view(['GET'])
def get_by_category_name(request):
    category_name = request.GET.get('category_name') if request.GET.get('category_name') != None else ''
    type_catalog = request.GET.get('type')
    print(category_name,type_catalog)
    type_catalog ={'supplier':"SUPL",'buyer':"BUYER"}[type_catalog.lower()]
    products = Product.objects.filter(Q(category__name__icontains = category_name.capitalize()) & Q(owner__type__icontains = type_catalog)).all()
    ser_products = serializers.ProductSerilizer(products,many=True)
    return Response(ser_products.data)


@api_view(['GET'])
def get_notifications_from_user(request):
    username = request.GET.get('username')
    notifications = Notification.objects.filter(from_user__username__icontains = username).all()
    ser = serializers.NotificationSerializer(notifications,many = True)
    return Response(ser.data)




@api_view(['GET'])
def get_notifications_to_user(request):
    username = request.GET.get('username')
    notifications = Notification.objects.filter(to_user__username__icontains = username).all()
    ser = serializers.NotificationSerializer(notifications,many = True)
    return Response(ser.data) 


@api_view(['POST'])
def delete_notification(request,pk):
    if request.method == 'POST':
        notif = Notification.objects.get(pk)
        if notif:
            notif.delete()
            notif.save()
    return Response({
        f'succes {pk}':'deleted'
    })


@api_view(['POST'])
def create_notification(request):
    to_user = User.objects.get(id = request.data['to_user'])
    from_user = User.objects.get(id = request.data['from_user'])
    order = Order.objects.get(id = request.data['order'])

    n_tf = Notification(from_user = from_user,to_user = to_user,order = order)

    if n_tf:
        n_tf.save()
        return Response({'status':'succes'})
    return Response({'status':'error'})




@api_view(['GET'])
def all_agreement(request):
    agreements = Agreement.objects.filter(check = False)
    return serializers.AgreementSerializer(agreements,many=True).data



class AddProductView(views.APIView):


    def post(self,request):
        # product_ser = serializers.ProductSerilizer(data = request.data)
        owner = request.data['owner']
        category = request.data['category']
        user = User.objects.get(id = owner)
        request.data['owner'] = CustomUser.objects.get(user = user)
        print('########################################')
        request.data['category'] = Category.objects.get(name = category)
        print(request.data)
        product = Product(**request.data)

        if product:
            product.save()
        # if Product.objects.filter(**request.data).exists():
        #     raise serializers.ValidationError('This data already exists')
        # if product_ser.is_valid():
        #     product_ser.save()
            return Response({
                "status":'saved'
                }
            )
        return Response({
            "status":'error'
        })



@api_view(['GET'])
def get_product(request):
    product_name = request.GET.get('product-name')
    product = Product.objects.filter(name = product_name).first()
    if product:
        return Response(serializers.ProductSerilizer(product).data)
    return Response({})



@api_view(['GET'])
def current_user_orders(request):
    username = request.GET.get('username')
    orders = Order.objects.filter(client__username=username).all()
    return Response(serializers.OrderSerializer(orders).data)


@api_view(['POST'])
def register(request):
    username = request.data.get('username').lower()
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    
    if password==confirm_password:
        user = User(username = username,password = make_password(password),first_name = request.data['first_name'],email = request.data['email'])
        
        if user:
            current = CustomUser(user = user,type = request.data['type'],licenze = request.data['licenze'],phone_number = request.data['phone_number'],iin_number = request.data['iin_number'],address = request.data['address'])
            user.save()
            current.save()
            return Response({'status':'succesfully registered!!'})
        else:
            return Response({'status':'User exist'})
    
    return Response({"status":"error"})


