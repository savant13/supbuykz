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
def all_products(request):
    products = Product.objects.all()
    serial_products = serializers.ProductSerilizer(products,many = True)
    return Response(serial_products.data)


@api_view(['GET'])
def get_by_category_name(request):
    category_name = request.GET.get('category_name') if request.GET.get('category_name') != None else ''
    type_catalog = request.GET.get('type')
    print(category_name,type_catalog)
    type_catalog ={'supplier':"SUPL",'buyer':"BUYER"}[type_catalog.lower()]
    
    products = Product.objects.filter(Q(category__name__icontains = category_name) & Q(owner__type__icontains = type_catalog)).all()
    ser_products = serializers.ProductSerilizer(products,many=True)
    return Response(ser_products.data)

def full_userinfo(pk):
    
    res = serializers.CustomUserSerializer(CustomUser.objects.get(user__id = pk)).data
    res['user'] = serializers.UserSerializer(User.objects.get(id = res['user'])).data

    return res


def response_data(r):
        result = []
        for v in r:
            v['from_user'] = full_userinfo(v['from_user'])
            v['to_user'] = full_userinfo(v['to_user'])
            v['order'] = serializers.OrderSerializer(Order.objects.get(id = v['order'])).data
            v['accepted'] = ['accepted','rejected','default'][v['accepted']-1]
            result.append(v)
        return result


@api_view(['GET'])
def get_notifications_from_user(request):

    
    username = request.GET.get('username')
    print(username)
    user = CustomUser.objects.get(user__username = username)
    notifications = Notification.objects.filter(from_user = user).all()
    ser = serializers.NotificationSerializer(notifications,many = True)
    response = response_data(ser.data)

    return Response(response)




@api_view(['GET'])
def get_notifications_to_user(request):
    username = request.GET.get('username')
    try:
        user = CustomUser.objects.get(user__username = username)
        notifications = Notification.objects.filter(to_user = user).all()
        ser = serializers.NotificationSerializer(notifications,many = True)
        response = response_data(ser.data)
        return Response(response)

    except:
        return Response({'status':'error'})
    



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

@api_view(['POST'])
def create_order(request):
    product_id = request.data['product_id']
    quantity = request.data['quantity']
    city = request.data['city']
    client = request.data['client']
    address = request.data['address']
    order = Order.objects.create(product = Product.objects.get(id = product_id),quantity=quantity,city=city,address=address,client = CustomUser.objects.get(user__id = client))
    if order:
        order.save()
        return Response({'status':'saved'})
    else:
        return Response({'status':'error'})

@api_view(['GET'])
def all_agreement(request):
    agreements = Agreement.objects.filter(check = False)
    return serializers.AgreementSerializer(agreements,many=True).data


@api_view(['POST'])
def add_product(request):


    # product_ser = serializers.ProductSerilizer(data = request.data)
    owner_id = request.data['owner_id']
    user = User.objects.get(id = owner_id)
    owner = CustomUser.objects.get(user=user)
    
    category = Category.objects.get(name = request.data['category_id'])
    print(owner.user.id)
    print('####################')
    result = {
        "name":request.data['name'],
        "description":request.data['description'],
        "price":request.data['price'],
        'owner':owner,
        'category':category,
        'product_img':request.data['product_img']
    }
    product = Product.objects.create(**result)
    
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


