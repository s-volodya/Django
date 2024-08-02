from django.http import JsonResponse
from .models import Groups,Teachers
from datetime import date, timedelta
from datetime import datetime, timedelta 
from datetime import date
import datetime
import time
import re


def validate(data,id,admin):
    print('mtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    now = datetime.datetime.now()
    group=Groups.objects.filter(id=id,parent_admin = admin )
    valit=r'[\d]{2}[:]{1}[\d]{2}'
    eror=False
    eror_elemnts_syntax=[]
    for i in data:
        if i == 'login_sesion':
            continue
        serch=re.findall(valit,data[i])
        if data[i]:
            if serch:
                pass
            else:
                eror_elemnts_syntax.append(i)
                eror=True
    eror_parent_non=[]
    eror_sravneni=[]
    eror_time_limit=[]
    if eror:
        return {'error_syntax':eror_elemnts_syntax,'error_parent_non':eror_parent_non,'error_sravnenie':eror_sravneni,'error_time_limit':eror_time_limit}
    for i in data:
        if i == 'login_sesion':
            continue
        if data[i]:
            if data[i.split('_')[0]+'_start']:
                if data[i.split('_')[0]+'_end']:
                    pass
                else:
                    eror_parent_non.append(i.split('_')[0]+'_end')
                    eror=True
            else:
                eror_parent_non.append(i.split('_')[0]+'_start')
            if data[i.split('_')[0]+'_start'] and data[i.split('_')[0]+'_end']:
                if int(data[i.split('_')[0]+'_start'].split(':')[0])<=23 and int(data[i.split('_')[0]+'_start'].split(':')[1])<=59 and int(data[i.split('_')[0]+'_end'].split(':')[0])<=23 and int(data[i.split('_')[0]+'_end'].split(':')[0])<=59:
                    start_time = datetime.datetime.strptime(data[i.split('_')[0]+'_start'],"%H:%M")
                    end_time =  datetime.datetime.strptime(data[i.split('_')[0]+'_end'],"%H:%M")
                    if start_time>=end_time:
                        if data[i.split('_')[0]+'_end'] in eror_sravneni:
                            pass
                        else:
                            if {i.split('_')[0]:[data[i.split('_')[0]+'_start'], data[i.split('_')[0]+'_end']] } in eror_sravneni:
                                eror=True
                            else:
                                eror_sravneni.append({i.split('_')[0]:[data[i.split('_')[0]+'_start'],data[i.split('_')[0]+'_end']]})
                                eror=True
                else:
                    if {i.split('_')[0]:[data[i.split('_')[0]+'_start'],data[i.split('_')[0]+'_end']] } in eror_time_limit:
                        eror=True
                    else:
                        eror_time_limit.append({i.split('_')[0]:[data[i.split('_')[0]+'_start'],data[i.split('_')[0]+'_end']]})
                        eror=True
    if eror:
        return {'error_syntax':eror_elemnts_syntax,'error_parent_non':eror_parent_non,'error_sravnenie':eror_sravneni,'error_time_limit':eror_time_limit}
    eror=False

    teacher=Teachers.objects.filter(id=group.get().teacher.id,parent_admin = admin ).values()[0]
    eror_teacher_work=[]
    eror_teacher_work_time=[]
    week_name_eroor=[]
    
    for i in data:
        if i == 'login_sesion':
            continue
        print(i)
        
        if len(data[i])!=0:
            week_name_shedule=i.split('_')[0]
            if teacher[i]:
                if '_start' in i :
                    group_time_start=time.strptime(data[i],'%H:%M')
                    teacher_work_time_start=time.strptime(teacher[i],'%H:%M')
                    teacher_work_time_end=time.strptime(teacher[week_name_shedule+'_end'],'%H:%M')
                    if group_time_start>=teacher_work_time_start and group_time_start<teacher_work_time_end :
                        pass
                    else:
                    
                        eror_teacher_work_time.append({'teacher':(teacher[i],teacher[week_name_shedule+'_end'],week_name_shedule,i)})
                        eror=True
                elif '_end' in i:
                    group_time_end=time.strptime(data[i],'%H:%M')
                    teacher_work_time_end=time.strptime(teacher[i],'%H:%M')
                    teacher_work_time_start=time.strptime(teacher[week_name_shedule+'_start'],'%H:%M')
                    if group_time_end<=teacher_work_time_end and group_time_end>teacher_work_time_start:
                        pass
                    else:
                        eror_teacher_work_time.append({'teacher':(teacher[i],teacher[week_name_shedule+'_end'],week_name_shedule,i)})
                        eror=True
            else:
                eror=True
                eror_teacher_work.append(i)
                week_name_eroor.append(week_name_shedule)
 
    if eror:
        return {'eror_teacher_work':eror_teacher_work,'eror_teacher_work_time':eror_teacher_work_time,'week_name_eroor':week_name_eroor}
    if len(data)==3:
        print('prcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa11')
        return {'ok_save':'ok'}