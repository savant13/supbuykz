from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('all-categories/',views.all_categories,name='all_categories'),
    path('categories/',views.get_by_category_name,name = 'categories'),
    path('add-product/',views.add_product),
    path('notification-from/',views.get_notifications_from_user),
    path('notification-to/',views.get_notifications_to_user),
    path('all-product/',views.all_products),
    
    path('product/',views.get_product,name='get_product'),
    path('user-info/<int:pk>',views.profile,name='profile'),
    path('register/',views.register),
    path('create-notification/',views.create_notification),
    path('delete-notification/',views.delete_notification)


    
]
