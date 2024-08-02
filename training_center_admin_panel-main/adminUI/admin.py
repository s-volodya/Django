from django.contrib import admin
from .models import Admins,Users_table,Message,Message_files, Students, Groups, Teachers, TeacherLanguages, Subjects,Lesonss,Language,Componet,Languages,Group_lesons,StudentLanguages,Students_info_group_data,Room,Room_grup_week,Payment_student,Studnets_language_last_done
# Register your models here.

admin.site.register(Admins)
admin.site.register(Students)
admin.site.register(Groups)
admin.site.register(Teachers)
admin.site.register(TeacherLanguages)
admin.site.register(Subjects)
admin.site.register(Lesonss)
admin.site.register(Language)
admin.site.register(Componet)
admin.site.register(Languages)
admin.site.register(Group_lesons)
admin.site.register(Students_info_group_data)
admin.site.register(StudentLanguages)
admin.site.register(Room)
admin.site.register(Room_grup_week)
admin.site.register(Payment_student)
admin.site.register(Message)
admin.site.register(Message_files)
admin.site.register(Users_table)
admin.site.register(Studnets_language_last_done)




