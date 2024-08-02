from adminUI.views import retoken
from django.shortcuts import render,redirect
from adminUI.views import update_grups_status

from datetime import date, timedelta, tzinfo 
from datetime import date
import datetime
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.http import JsonResponse
import json
import calendar
from django.template.defaulttags import register
import collections
import pymysql
import re
from django.core.files.storage import FileSystemStorage
from dateutil.relativedelta import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from adminUI.models import Admins, Languages,Message_files, Students, Groups, Teachers, TeacherLanguages,Subjects,Language,Componet,Lesonss,Group_lesons,Students_info_group_data,StudentLanguages,Room,Room_grup_week,Payment_student,Message,Users_table,Studnets_language_last_done
from rest_framework.permissions import IsAuthenticated
import jwt
from pytz import UTC
from datetime import timedelta



def token(user):
    token_data = {}
    valid_till = datetime.datetime.now(UTC) + timedelta(hours=24*7)
    token_data['expired'] = int(valid_till.timestamp())
    token_data['user_id']=user.id
    token_data['last_name']=user.last_name
    token_data['first_name']=user.first_name
    print(token_data)
    token = jwt.encode(token_data, 'asdasdasdasdasd', algorithm='HS256')
    print(token_data,token.decode('utf-8'))
    return token.decode('utf-8')


def retoken(token):

    try:
        token_data = jwt.decode(token, 'asdasdasdasdasd', verify=True)
        user = Students.objects.filter(id = token_data['user_id']).get()
         
        valid_true=(token_data['last_name'] == user.last_name and token_data['first_name'] == user.first_name and token_data['user_id']==user.id)
        if valid_true and user.set_expiry_time.replace(tzinfo=None)  >= datetime.datetime.now() and user.token_user == token:
            Students.objects.filter(id = token_data['user_id']).update(set_expiry_time=datetime.datetime.now()+timedelta(hours=2))
            return True,user.id
        else:
            return False
    except Exception as e:
        print('sxal',e,'sssss')
        return False

class Api_token(APIView):
    def on_post(self,request,*args,**kwargs):
        pass
    def on_get(self,request,*args,**kwargs):
        pass

    def post(self,request,*args,**kwargs):
        request_data = request.POST
        try:
            retoken_user = retoken(request_data['Auth_Token'])
            if retoken_user[0]:
                admin = Admins.objects.filter(id = Students.objects.get(id = retoken_user[1]).parent_admin.id).get()
                return self.on_get(request,retoken_user[1],admin)
            else:
                return Response({"No valid Token found":"This token is not valid"},status = status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"Error":str(e)},status = status.HTTP_404_NOT_FOUND)
    def get(self,request,*args,**kwargs):
        request_data = request.GET
        try:
            retoken_user = retoken(request_data['Auth_Token'])
            print(retoken_user)
            if retoken_user:
                admin = Admins.objects.filter(id = Students.objects.get(id = retoken_user[1]).parent_admin.id).get()
                return self.on_get(request,retoken_user[1],admin)
            else:
                return Response({"No valid Token found":"This token is not valid"},status = status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"Error":str(e)},status = status.HTTP_404_NOT_FOUND)








class Login(APIView):    
    def post(self,request):
        request_data = request.POST
        try:
            serch_login_user = Students.objects.filter(email__icontains = request_data['username'],password = request_data['password'])
            if serch_login_user:
                token_login_user = token(serch_login_user.get())
                serch_login_user.update(set_expiry_time = datetime.datetime.now()+timedelta(hours = 2),token_user = token_login_user)
                return Response({'success':'success','token':token_login_user})

            else:
                pass
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_404_NOT_FOUND)

        return Response({"ok":'ok'},status=status.HTTP_200_OK)

#########################USer Home Page ####################################
class Home_page(Api_token):
    def on_post(self,request,*args,**kwargs):

        return Response({'1111':'asasasas'})

    def on_get(self,request,*args,**kwargs):
        id_login_user = args[0]
        login_user = Students.objects.filter(id = id_login_user).get()
        response_data = {
                        'success':'True',"last_name":login_user.last_name,
                        "first_name":login_user.first_name
                        }

        return Response(data=response_data,status=status.HTTP_200_OK)


##################################### User info ####################################
class User_info(Api_token):
    def on_get(self, request, *args, **kwargs):
        id = args[0]
        admin = args[1]
        student = Students.objects.filter(id = id).get()
        data_start_cantract_studnet = datetime.datetime.strptime(student.contract_start,"%Y-%m-%d")+timedelta(days=3)
        data_end_cantract_studnet = datetime.datetime.strptime(student.contract_end,"%Y-%m-%d")+timedelta(days=3)
        payment_student_all = student.priceM_sale
        data_price = data_start_cantract_studnet
        data_price_rey = []
        data_price_rey.append(data_start_cantract_studnet)
        while True:
            data_price += relativedelta(months =+ 1)
            if data_price >= data_end_cantract_studnet:
                break
            payment_student_all += student.priceM_sale
            data_price_rey.append(data_price)
        student_language = StudentLanguages.objects.filter(student=student).values('language')
        payment_studnet = Payment_student.objects.filter(parent_admin = admin)
        lesons__component = Lesonss.objects.filter(language__in=student_language,isArchived=False,parent_admin = admin).values()
        component_language = Componet.objects.filter(id__in=student_language,parent_admin = admin).values()
        student_data_group = Students_info_group_data.objects.filter(students=student)
        group_lesons_student = collections.defaultdict(dict)
        non = False
        if Students.objects.filter(id=id ,parent_admin = admin).get().group != None:
            teacher=Teachers.objects.filter(id = Students.objects.filter(id = id ,parent_admin = admin).get().group.teacher.id).get()
            group=Groups.objects.filter(id=student.group.id ,parent_admin = admin).get()
            update_grups_status(group.id)
            non = True
        don_lesons_number = 0
        groups_leosns_id = []
        for i in student_data_group:
            number = 0
            data_end = i.end_attend_grops_data.split('-')
            data_end = data_end[0]+'.'+data_end[1]+'.'+data_end[2]
            data_start = i.start_attend_grops_data.split('-')
            data_start = data_start[0]+'.'+data_start[1]+'.'+data_start[2]
            grop_lesons = Group_lesons.objects.filter(parent_group=i.grups,data_leson_number=data_start).union(Group_lesons.objects.filter(parent_group=i.grups).exclude(data_leson_number__lte=data_start).exclude(data_leson_number__gte=data_end)).union(Group_lesons.objects.filter(parent_group=i.grups,data_leson_number=data_end))
            student_grups_start_time = i.start_attend_grops_time.split(':')
            student_grups_end_time = i.end_attend_grops_time.split(':')
            data_start1 = data_start.split('.')
            data_end1 = data_end.split('.')
            student_leson_time_start = datetime.datetime(int(data_start1[0]), int(data_start1[1]),int(data_start1[2]), int(student_grups_start_time[0]),int(student_grups_start_time[1]),0)
            student_leson_time_end = datetime.datetime(int(data_end1[0]), int(data_end1[1]),int(data_end1[2]), int(student_grups_end_time[0]),int(student_grups_end_time[1]),0)
            for j in grop_lesons:
                time_start_status = j.leson_time_start.split(":")
                time_end_status = j.leson_time_end.split(":")
                data_leson = j.data_leson_number.split('.')
                lesons_time_start = datetime.datetime(int(data_leson[0]), int(data_leson[1]),int(data_leson[2]), int(time_start_status[0]),int(time_start_status[1]),0)
                lesons_time_end = datetime.datetime(int(data_leson[0]), int(data_leson[1]),int(data_leson[2]), int(time_end_status[0]),int(time_end_status[1]), 0)
                if j.data_leson_number == data_start:
                    if student_leson_time_start <= lesons_time_start :
                        pass
                    
                elif j.data_leson_number == data_end:
                    if student_leson_time_end <= lesons_time_start:
                        pass 
                else:
                    if j.status == 'Done':
                        don_lesons_number += 1
                    if j.id_lesons in group_lesons_student:
                        number=0
                        number = group_lesons_student[j.id_lesons]['number']+1
                        group_lesons_student[j.id_lesons]['number']=number
                        group_lesons_student[j.id_lesons]['status']=j.status
                        groups_leosns_id.append(j.id)
                    else:
                        if j.id_lesons == '':
                            group_lesons_student[j.id_lesons] = {'id':j.id_lesons,'number':1,'status':j.status,'component':Componet.objects.filter(component_name=j.leson_component_name).first().id}
                            groups_leosns_id.append(j.id)
                        else:
                            group_lesons_student[j.id_lesons] = {'id':int(j.id_lesons),'number':1,'status':j.status,'component':Componet.objects.filter(component_name=j.leson_component_name).first().id}
                            groups_leosns_id.append(j.id)
        history_done_lesons_change=Studnets_language_last_done.objects.filter(parent_studnet=student)
        print(group_lesons_student)
        for i in history_done_lesons_change:
            lesons_number=0
            for j in Lesonss.objects.filter(language=i.component_parent):
                print(i.component_parent.component_name)
                if str(j.id) in group_lesons_student:
                    number=0
                    number = group_lesons_student[str(j.id)]['number']+1
                    group_lesons_student[str(j.id)]['number']=number
                    group_lesons_student[str(j.id)]['status']='Done'
                else:
                    group_lesons_student[ str(j.id)] = {'id':j.id,'number':1,'status':"Done",'component':i.component_parent.id}
                
        group_lesons_student1 = []
        start = True
        number_lesons_all = 0
        componet_lesons_number = []
        status = ''
        # if 'studnents_calendar_lesons' in request.GET:
        #     lesons = Group_lesons.objects.filter(id__in = groups_leosns_id).order_by('data_leson_number')
        #     student_language = StudentLanguages.objects.filter(student = student).values('language')
        #     lesons__component = Lesonss.objects.filter(language__in = student_language,isArchived=False ,parent_admin = admin)
        #     id_studnet_language = []
        #     filter_studnet_language_lesons = []
        #     for j in lesons__component:
        #         id_studnet_language.append(j.id)
        #     for i in lesons:
        #         if i.id_lesons != '':              
        #             if int(i.id_lesons) in id_studnet_language:
        #                 filter_studnet_language_lesons.append(i.id)
        #     lesons = Group_lesons.objects.filter(id__in = filter_studnet_language_lesons).order_by('data_leson_number').values()
        #     data = {"lesons":list(lesons)}
        #     return JsonResponse(data)

        for i in component_language:
            nuber = 0
            status = ''
            done_lesons = True
            for j in group_lesons_student:
                if i['id'] == group_lesons_student[j]['component']:
                    nuber += group_lesons_student[j]['number']
                    status = group_lesons_student[j]['status']
                    print(status,group_lesons_student[j]['component'])
            componet_lesons_number.append({'id_component':i['id'],'numbers':nuber,'status':status})

        done_lesons_number = 0
        for j in group_lesons_student:
            if group_lesons_student[j]['status'] == "Done":
                done_lesons_number +=1
            group_lesons_student1.append(group_lesons_student[j])
        all_lesons_studnet = len(Lesonss.objects.filter(language__in=student_language,isArchived=False,parent_admin = admin).values('id'))
        curse_pracent = (done_lesons_number * 100)/all_lesons_studnet
        if non:
            data = {
                    'payment':payment_student_all,'data_pay':data_price_rey,'payment_studnet':payment_studnet,
                   'component':component_language,'lesons':lesons__component,'lesons_student':group_lesons_student1,
                    'component_numbers':componet_lesons_number,'don_lesons_number':don_lesons_number,"curse_paracent":curse_pracent
                    }          
            return Response(data = data)  
        else:
            data = {
                    'payment':payment_student_all,'data_pay':data_price_rey,'payment_studnet':payment_studnet,
                    'component':component_language,'lesons':lesons__component,'lesons_student':group_lesons_student1,
                    'component_numbers':componet_lesons_number,'don_lesons_number':don_lesons_number,"curse_paracent":curse_pracent
                    }
            return Response(data = data)  
        







