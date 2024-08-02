from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views



urlpatterns = [
    ############login Token########
    path('login/', views.Login.as_view()),
    path('home/',views.Home_page.as_view()),
    path('user_info/',views.User_info.as_view())
]



