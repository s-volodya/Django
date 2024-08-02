from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    # admin info 
    path('admin_info/', views.Admin_info.as_view()),
    #  Students 
    path('', views.Login.as_view()),
    path('login/',  views.Login.as_view()),
    path('user_info/',  views.usersinfo),
    path('students/', views.Student_list.as_view()),
    path('add/', views.Student_add.as_view()),
    path('edit/', views.Student_edit.as_view()),
    path('students/<id>/',views.Student_info.as_view() ),
    path('students_calendar/<id>/',views.Calendar_studneta.as_view() ),
    #  Groups
    path('groups/', views.Groups_list.as_view()),
    path('addgroup/', views.Groups_add.as_view()),
    path('groups/<id>/', views.Group_actions.as_view()),
    path('groups_lesons_data/<id>/',views.Group_lesons_data.as_view()),
    path('grupCalendar/<id>/',views.Group_lesons_calendar.as_view()),
    #path('grupCalendar/<id>/',views.gruop_calendar),
    #  Teacher
    path('teachers/', views.Teacher_list.as_view()),
    path('addteacher/', views.Teacher_add.as_view()),
    path('teachers/edit/<id>/', views.Teacher_edit.as_view()),
    path('teachers/<id>/', views.Teacher_info.as_view()),

    #  Subjects
    path('subjects/<id>/', views.Subjects_list.as_view()),
    path('createSubject/', views.Create_subjects.as_view()),
    path('comment/<id>/',views.Comment_lesons.as_view()),

    #  Room
    path('rooms/',views.Room_list.as_view()),
    path('addrooms/',views.Room_add.as_view()),
    path('edit_rooms/<id>/',views.Room_Update.as_view()),

    # Shedule
    path('shedule/',views.Shedule.as_view()),
    path('update_shedule/<id>/',views.Update_shedule_lesons.as_view()),

    # Archive
    path('archive/<name>/',views.Archive.as_view()),

    # Chat
    path('chat/', views.Chat.as_view()),
    path('chat/<id>/', views.Chat_parent.as_view()),
    path('chat/actions/<id>/', views.Chat_actions.as_view()),
    path('chat_/serch_user/', views.Serch_user_chat.as_view()),



        # path('startchat/', views.index_example),
    # path('<str:room_name>/', views.room_example, name='room'),
    

    
]

