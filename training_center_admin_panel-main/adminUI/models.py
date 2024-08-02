from django.db import models
from django.core.files.storage import FileSystemStorage
from django.db.models.base import Model


# Create your models here.
class Admins(models.Model):
    id = models.AutoField('id', primary_key=True)
    email = models.CharField('email', max_length=30)
    password = models.CharField('password', max_length=20)
    first_name = models.CharField('name', max_length=20)
    last_name = models.CharField('last name', max_length=30)
    company_name = models.CharField('company_name', max_length=60 ,null = True)
    phone_number = models.CharField('phone_number', max_length=15 ,null = True)
    role=models.CharField('role_user',max_length  = 20, default='Super Admin')
    pictures_teacher=models.ImageField(null=True)
    logo = models.FileField ('logo',null=True)
    language_login_site = models.CharField("language_login_site", max_length  = 7, blank = True, null = True, default = "arm")
    sign_in_one = models.BooleanField('sign_in_one',default=True)
    
    def data(self):
        return [self.id,self.email,self.password,self.first_name,self.last_name]
    def userdata(self):
        return (self.email,self.password)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Teachers(models.Model):
    id = models.AutoField('id', primary_key=True)
    first_name = models.CharField('name', max_length=20)
    last_name = models.CharField('last name', max_length=30)
    email = models.CharField('email', max_length=30, default="example@gmail.com")
    phone_number = models.CharField('phone_number', max_length=30, default="+374 93606060")
    linkedin_link = models.CharField('link', max_length=100)
    monday_start = models.CharField("monday_start", max_length  = 6, blank = True, null = True, default = "")
    monday_end = models.CharField("monday_end", max_length  = 6, blank = True, null = True, default = "")
    tuesday_start = models.CharField("tuesday_start", max_length  = 6, blank = True, null = True, default = "")
    tuesday_end = models.CharField("tuesday_end", max_length  = 6, blank = True, null = True, default = "")
    wednesday_start = models.CharField("wednesday_start", max_length  = 6, blank = True, null = True, default = "")
    wednesday_end = models.CharField("wednesday_end", max_length  = 6, blank = True, null = True, default = "")
    thursday_start = models.CharField("thursday_start", max_length  = 6, blank = True, null = True, default = "")
    thursday_end = models.CharField("thursday_end", max_length  = 6, blank = True, null = True, default = "")
    friday_start = models.CharField("friday_start", max_length  = 6, blank = True, null = True, default = "")
    friday_end = models.CharField("friday_end", max_length  = 6, blank = True, null = True, default = "")
    saturday_start = models.CharField("saturday_start", max_length  = 6, blank = True, null = True, default = "")
    saturday_end = models.CharField("saturday_end", max_length  = 6, blank = True, null = True, default = "")
    sunday_start = models.CharField("sunday", max_length  = 6, blank = True, null = True, default = "")
    sunday_end = models.CharField("sunday", max_length  = 6, blank = True, null = True, default = "")
    isArchived = models.BooleanField('isArchived', default = False)
    password = models.CharField('password', max_length=20,default=123456789)
    role=models.CharField('role_user',max_length  = 20 ,default='Teacher')
    pictures_teacher=models.ImageField(null=True, default='default_img.jpg')
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    language_login_site = models.CharField("language_login_site", max_length  = 7, blank = True, null = True, default = "arm")
    sign_in_one = models.BooleanField('sign_in_one',default=True)
    def data(self):
        return [self.id,self.first_name,self.last_name,self.linkedin_link,self.isArchived,self.email,self.phone_number]
    def userdata(self):
        return (self.email,self.password)

class Subjects(models.Model):
    id = models.AutoField('id', primary_key=True)
    name = models.CharField('name', max_length = 20)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name="Subject"
        verbose_name_plural="Subjects"

class SubSubjects(models.Model):
    name = models.CharField('name', max_length = 30)
    parentSubject = models.ForeignKey(Subjects, on_delete = models.CASCADE)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
class Languages(models.Model):
    id = models.AutoField('id', primary_key=True)
    name = models.CharField('name', max_length = 20)
    parentSubject = models.ForeignKey(SubSubjects, on_delete = models.CASCADE)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    def data(self):
        return [self.id,self.name]
    
    class Meta:
        verbose_name = 'Language'
        verbose_name_plural = 'Languages'

class Lesson(models.Model):
    name = models.CharField('name', max_length = 50)
    Description = models.CharField('description', max_length = 300)
    language = models.ForeignKey(Languages, on_delete = models.CASCADE)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    def __str__(self):
        return self.name

class Language(models.Model):
    id=models.AutoField('id',primary_key=True)
    name1=models.CharField('name1',max_length=30)
    parentSubject = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    isArchived = models.BooleanField('isArchived', default = False)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    def data(self):
        return [self.id,self.name1]
    def __str__(self):
        return self.name1

    class Meta:
        verbose_name = 'Language'
        verbose_name_plural = 'Languages'
    
class Groups(models.Model):
    id = models.AutoField('id', primary_key=True)
    name = models.CharField('name', max_length = 100)
    language = models.ForeignKey(Language, blank = True, null = True, on_delete = models.SET_NULL)
    teacher = models.ForeignKey(Teachers, blank = True, null = True, on_delete = models.SET_NULL)
    start = models.CharField('start', max_length = 11)
    end = models.CharField('end', max_length = 11)
    monday_start = models.CharField("monday_start", max_length  = 6, blank = True, null = True, default = "")
    monday_end = models.CharField("monday_end", max_length  = 6, blank = True, null = True, default = "")
    tuesday_start = models.CharField("tuesday_start", max_length  = 6, blank = True, null = True, default = "")
    tuesday_end = models.CharField("tuesday_end", max_length  = 6, blank = True, null = True, default = "")
    wednesday_start = models.CharField("wednesday_start", max_length  = 6, blank = True, null = True, default = "")
    wednesday_end = models.CharField("wednesday_end", max_length  = 6, blank = True, null = True, default = "")
    thursday_start = models.CharField("thursday_start", max_length  = 6, blank = True, null = True, default = "")
    thursday_end = models.CharField("thursday_end", max_length  = 6, blank = True, null = True, default = "")
    friday_start = models.CharField("friday_start", max_length  = 6, blank = True, null = True, default = "")
    friday_end = models.CharField("friday_end", max_length  = 6, blank = True, null = True, default = "")
    saturday_start = models.CharField("saturday_start", max_length  = 6, blank = True, null = True, default = "")
    saturday_end = models.CharField("saturday_end", max_length  = 6, blank = True, null = True, default = "")
    sunday_start = models.CharField("sunday", max_length  = 6, blank = True, null = True, default = "")
    sunday_end = models.CharField("sunday", max_length  = 6, blank = True, null = True, default = "")
    changes = models.CharField("changes", max_length = 1000, blank = True, null = True, default = "")
    dayTimes = models.CharField("dayTimes", max_length = 1000, blank = True, null = True, default = "")
    isArchived = models.BooleanField('isArchived', default = False)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")

    class Meta:
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'


class Students(models.Model):
    id = models.AutoField('id', primary_key=True)
    first_name = models.CharField('first_name', max_length = 20)
    last_name = models.CharField('last_name', max_length = 30)
    email = models.CharField('email', max_length = 50)
    phone_number = models.CharField('phone_number', max_length = 9)
    phone_number_code = models.CharField('phone_number_code', max_length = 4)
    contract_number = models.CharField('contract_number', max_length = 45)
    contract_number_code = models.CharField('contract_number_code', max_length = 4)
    passport_type = models.CharField('passport_type', max_length = 13)
    passport_number = models.CharField('passport_number', max_length = 13)
    address = models.CharField('addres', max_length = 45)
    date_of_birth = models.CharField('date_of_birth', max_length = 11)
    contract_start = models.CharField('contract_start', max_length = 11)
    contract_end = models.CharField('contract_end', max_length = 11)
    priceM = models.IntegerField("priceM")
    price = models.IntegerField("price")
    price_sale = models.IntegerField('price_sale',default=0)
    priceM_sale = models.IntegerField('priceM_sale',null=True)
    passportPic = models.ImageField(null=True)
    language = models.ForeignKey(Language, blank = True, null = True, on_delete = models.SET_NULL)
    group = models.ForeignKey(Groups, blank = True, null = True, on_delete = models.SET_NULL)
    isArchived = models.BooleanField('isArchived', default = False)
    activ = models.BooleanField('Activat',default=False)
    pictures_studnet=models.ImageField(null=True)
    password = models.CharField('password',max_length=25, blank = True)
    comment=models.CharField('comment',max_length=250,blank = True,null=True,default=' ')
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    set_expiry_time = models.DateTimeField(null=True )
    token_user = models.TextField(null=True,max_length=250)
    def data(self):
        return [self.id,self.first_name,self.last_name,self.email,self.phone_number,self.date_of_birth,self.language,self.contract_number,self.passport_type,self.passport_number,self.address,self.contract_start,self.contract_end,self.priceM,self.price,self.passportPic,self.isArchived]
    def login_data(self):
        return (self.email,self.password)
    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'




class Componet(models.Model):
    id = models.AutoField('id', primary_key=True)
    component_name=models.CharField("component Name",max_length=60)
    languages=models.ForeignKey(Language,on_delete=models.CASCADE)
    isArchived = models.BooleanField('isArchived', default = False)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    class Meta:
        verbose_name = 'Component'
        verbose_name_plural = 'Component'

    def data(self):
        return [self.component_name,self.id]

class Lesonss(models.Model):
    id = models.AutoField('id', primary_key=True)
    name = models.CharField('name', max_length = 50)
    Description = models.CharField('description', max_length = 300)
    file=models.FileField(null=True)
    language = models.ForeignKey(Componet, on_delete = models.CASCADE)
    isArchived = models.BooleanField('isArchived', default = False)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")

    def data(self):
        return [self.name,self.id]


class TeacherLanguages(models.Model):
    language = models.ForeignKey(Componet, blank = True, null = True, on_delete = models.CASCADE)
    teacher = models.ForeignKey(Teachers, blank = True, null = True, on_delete = models.CASCADE)


class StudentLanguages(models.Model):
    language = models.ForeignKey(Componet, blank = True, null = True, on_delete = models.CASCADE)
    student = models.ForeignKey(Students, blank = True, null = True, on_delete = models.CASCADE)

class Studnets_language_last_done(models.Model):
    id = models.AutoField('id', primary_key=True)
    component_parent = models.ForeignKey(Componet, blank = True, null = True,on_delete= models.SET_NULL)
    parent_studnet = models.ForeignKey(Students, blank = True, null = True, on_delete = models.CASCADE)
    
class Students_info_group_data(models.Model):
    id = models.AutoField('id', primary_key=True)
    grups=models.ForeignKey(Groups,blank = True, null = True, on_delete = models.CASCADE)
    students=models.ForeignKey(Students,blank = True, null = True, on_delete = models.CASCADE)
    start_attend_grops_data=models.CharField('start_attend_grops_data',max_length=50)
    start_attend_grops_time=models.CharField('start_attend_grops_time',default = '-',max_length=50)
    end_attend_grops_data=models.CharField('end_attend_grops_data',max_length=50)
    end_attend_grops_time=models.CharField('end_attend_grops_time',default = '-' ,max_length=50)
    status= models.BooleanField('status', default = False)
    def __str__(self):
        return self.students.first_name+"  "+self.students.last_name+" "+str(self.status)

class Room(models.Model):
    id = models.AutoField('id', primary_key=True)
    name=models.CharField('room_name',default=True,max_length=45)
    adres=models.CharField('adress',default=True,max_length=45)
    number_of_seats=models.CharField('Number_of_seats',default=True,max_length=10)
    computers=models.CharField('comp',default=True,max_length=10)
    specifications=models.TextField('Specifications',default=True,max_length=2500)
    comments=models.TextField('comments',default=True,max_length=2500)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name="Room"
        verbose_name_plural='Rooms'


class Room_grup_week(models.Model):
    id = models.AutoField('id', primary_key=True)
    monday= models.ForeignKey(Room,blank = True, null = True, on_delete = models.CASCADE , related_name='monday')
    tuesday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE , related_name='tuesday')
    wednesday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE ,related_name='wednesday' )
    thursday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE , related_name='thursday')
    friday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE  ,related_name='friday')
    saturday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE , related_name='saturday')
    sunday=models.ForeignKey(Room, blank = True, null = True, on_delete = models.CASCADE  ,related_name='sunday')
    grupa=models.ForeignKey(Groups, blank = True, null = True, on_delete = models.CASCADE )
    class Meta:
        verbose_name="Room_Grops_Week"
        verbose_name_plural='Room_Grops_Week'
class Payment_student(models.Model):
    id = models.AutoField('id',primary_key=True)
    paid_amount = models.IntegerField('paint_amout',null=True)
    comment = models.CharField('comment',max_length=200,null=True)
    file_payment = models.FileField('File')
    data=models.DateField('data',null=True)
    parent_studnet = models.ForeignKey(Students,blank = True, null = True, on_delete = models.CASCADE)
    send_mail=models.BooleanField(default=False,null=True)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")
    class Meta:
        verbose_name="Payment Student"
        verbose_name_plural='Payment Students'
class Group_lesons(models.Model):
    id = models.AutoField('id', primary_key=True)
    id_lesons=models.CharField('id_lesons', null = True, max_length = 50)
    lesons_name=models.CharField('lesons_name', max_length = 50, null = True)
    data_leson=models.CharField('data_lesons', max_length = 50, null = True)
    data_leson_number=models.CharField('data_leson_number', null = True,max_length=50)
    leson_time_start=models.CharField('leson_time_start', max_length = 50, null = True)
    leson_time_end=models.CharField('leson_time_end', max_length = 50, null = True)
    leson_component_name=models.CharField('component_leson', null = True,max_length=50)
    shedul_leson=models.BooleanField('shedul_leson',default=False ,null = True)
    room=models.ForeignKey(Room,null=True,on_delete= models.SET_NULL)
    comment=models.CharField('comment',null=True,max_length=100)
    status=models.CharField('status', max_length =15 , null = True)
    parent_group=models.ForeignKey(Groups, on_delete = models.CASCADE)

    def data(self):
        return [self.lesons_name,self.id]
class Message(models.Model):
    id = models.AutoField('id', primary_key=True)
    from_message_admin=models.ForeignKey(Admins,blank = True,null=True, on_delete = models.CASCADE , related_name='from_message_admin')
    from_message_teacher=models.ForeignKey(Teachers,blank = True,null=True, on_delete = models.CASCADE , related_name='from_message_teacher')
    to_message_admin=models.ForeignKey(Admins,blank = True,null=True, on_delete = models.CASCADE , related_name='to_message_admin')
    to_message_teacher=models.ForeignKey(Teachers,blank = True,null=True, on_delete = models.CASCADE  ,related_name='to_message_teacher')
    message=models.CharField('Message', null = True,max_length = 1000)
    data=models.DateTimeField('data_time', null = True)
    status=models.BooleanField('reded',default=False,null=True)
    delete_from=models.BooleanField(default=False,null=True)
    
  
class Message_files(models.Model):
     id = models.AutoField('id', primary_key=True)
     message_image=models.ImageField(null=True, upload_to='img/message_img/')
     parent_message=models.ForeignKey(Message,blank = True,null=True, on_delete = models.CASCADE )

class Users_table(models.Model):
    id = models.AutoField('id',primary_key=True)
    from_teahcer = models.ForeignKey(Teachers,blank = True,null=True, on_delete = models.CASCADE , related_name='from_teacher')
    from_admin=models.ForeignKey(Admins,blank = True,null=True, on_delete = models.CASCADE , related_name='from_admin')
    to_admin=models.ForeignKey(Admins,blank = True,null=True, on_delete = models.CASCADE , related_name='to_admin')
    to_teacher=models.ForeignKey(Teachers,blank = True,null=True, on_delete = models.CASCADE  ,related_name='to_teacher')
    data_end_message=models.DateTimeField('data_time', null = True)
    end_message=models.CharField('end_message',null = True,max_length = 1000)
    parent_admin = models.ForeignKey(Admins,null = False,  on_delete = models.CASCADE,default = "1")


    

 



         






