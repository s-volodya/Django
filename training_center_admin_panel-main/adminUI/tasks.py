from channels.generic.websocket import JsonWebsocketConsumer
from students.celery import app
import imaplib
import email
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from validate_email import validate_email
from .models import  Students,Payment_student

from dateutil.relativedelta import *
from datetime import date, timedelta
from datetime import datetime, timedelta 
from datetime import date
import datetime
import time
import requests
""" run command Celery : celery -A students worker --loglevel=INFO"""

# def valid_email(email_valid):
#     mail = imaplib.IMAP4_SSL('imap.gmail.com')
#     mail.login('nubaryan.razmik1998@gmail.com', '098398968++')
#     mail.list()
#     mail.select("inbox")
#     result, data = mail.search(None, "ALL")
#     ids = data[0] 
#     id_list = ids.split()  
#     latest_email_id = id_list[-1]  
#     result, data = mail.uid('search', None, "ALL") 
#     latest_email_uid = data[0].split()[-1]
#     result, data = mail.uid('fetch', latest_email_uid, '(RFC822)')
#     raw_email = data[0][1]
#     email_message = email.message_from_bytes(raw_email)

#     for i in email_message.items():
#         if i[0]=='X-Failed-Recipients':
#             print(i[0])
#             if i[1]==email_valid:
#                 print(i[1],email_valid)
#                 return False
#     return True
def valid_email(email_valid):
    is_valid = validate_email(email_valid,verify=True)
    if is_valid:
        return True
    else:
        return False
@app.task
def archive_studnet_contract_end():
  now = datetime.datetime.now() 
  now_tuday=now.strftime("%Y-%m-%d")
  now_tuday1=now.strptime(now_tuday,"%Y-%m-%d")-timedelta(days=3)
  now_tuday=now_tuday1.strftime("%Y-%m-%d")
  Students.objects.filter(contract_end=now_tuday).update(isArchived=True)
  return True


@app.task
def send_mail(content,receiver_address,student_id,component):
    try:
        student=Students.objects.filter(id=student_id).get()
        data_start_cantract_studnet=datetime.datetime.strptime(student.contract_start,"%Y-%m-%d")+timedelta(days=3)
        data_end_cantract_studnet=datetime.datetime.strptime(student.contract_end,"%Y-%m-%d")+timedelta(days=3)

        payment_student_all=student.priceM_sale
        data_price=data_start_cantract_studnet
        data_price_rey=[]
        data_price_rey.append(data_start_cantract_studnet)
        months=0
        while True:
            data_price+=relativedelta(months=+1)
            if data_price >= data_end_cantract_studnet:
                break
            payment_student_all+=student.priceM_sale
            data_price_rey.append(data_price)
        data=''
        head_table=''
        print('hasasa',data_price_rey)
        for i in data_price_rey:
            months+=1
            if student.price_sale==0:
                head_table=""" 
                
                      <th>Ամսաթիվ</th>
                      <th>Գումար</th>
                
                """
                
                
         
                data1=""" 
                   <tr>
                <td>"""+i.strftime("%d.%m.%Y")+"""</td>
                <td>"""+str(student.priceM)+"""դ</td>
                  </tr>
                """
            else:
                head_table="""   
                            <th>Ամսաթիվ</th>
                            
                            <th>Գումար</th>
                            
                            <th>Զեղչ (%)</th>
                            
                            <th>Վերջնական գումար</th> 
                                        
                          """
                data1=""" 
                   <tr>
                       <td>"""+i.strftime("%d.%m.%Y")+"""</td>
                       <td>"""+str(student.priceM)+"""դ</td>
                       <td>"""+str(student.price_sale)+""" %</td>
                       <td>"""+str(student.priceM_sale)+""" դ</td>

                  </tr>
                """
            data+=data1
            print(data)

        

        print(receiver_address)

        mail_content = content
        sender_address = 'nubaryan.razmik1998@gmail.com'
        sender_pass = '098398968++'
        print('asasdasdasdasd')

        message = MIMEMultipart()
        message['From'] = sender_address
        message['To'] = receiver_address
        html= """
<!DOCTYPE html>
<html>
<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' /><!-- Define Charset -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' /><!-- Responsive Meta Tag -->
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0' name='viewport'/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='x-apple-disable-message-reformatting' />

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
      <style type="text/css">
        .table1 {
    width: 700px;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
}

.table1 td,
.table1 th {
    width: 100%;
    max-width: 94%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
}

.table1 th {
    background-color: #F5F9FA;
    color: #000000;
}
.total1 {
    margin-right: 20px;
    float: right;
    display: flex;
    text-align: center;
    align-items: center;
}
.total1 h2 {
    width: 200px;
}
.total1 span {
    color: grey;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
      </style>
    <title></title>
</head>
<body leftmargin='0' marginheight='0' marginwidth='0' topmargin='0'  bgcolor='#F2F2F2'>
  <table width='100%'  style='background-image: url(https://i.imgur.com/e6f8Fq3.png);background-size:cover;background-repeat: no-repeat;'>
    <tr>
      <td align='center' width='100%' >
        <table   border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;'>
      <tr>
        <td align='center'>
          <img src='https://i.imgur.com/3kxM3kk.png' width='200' style='Margin-top:50px;display: block;'>
        </td>
      </tr>
      <tr>
          <td align='center'>
          <h1 style='font-family: sans-serif;font-weight: bold;font-size: 40px;color: #272727;line-height:55px'>Բարի գալուստ Կոլիբրիլաբ ուսումնական թիմ։<br>
          Contract Number """+student.contract_number+"""</h1>
        </td>
      </tr>

      <tr>
        <td align='center' style=" text-align: end;">
           <p style='font-family: sans-serif;font-weight: bold;font-size: 23px;color: #272727'>Contract Start """+student.contract_start+"""</p>
            <p style='font-family: sans-serif;font-weight: bold;font-size: 23px;color: #272727'>Contract end """+student.contract_end+"""</p>
        </td>
      </tr>
      <tr>
        <td align='center'>
          <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
            <tr>
              <td>
                <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='border-bottom: 1px solid #A6A6A6'>
                  <tr>
                    <td>
                      <table style='width: 100%;max-width: 900px' align='center'>
                        <tr align='center'>
               <td align='left'><h1 style='color: #31597B;font:bold 25px sans-serif'>Մասնակից՝</h1></td>
              <td rowspan='2' style='color:#272727;font:bold 18px sans-serif;'>
                <table align='center' >
                  <tr>
                    <td> <img src='https://i.imgur.com/L93dOWv.png' style='Margin-right: 10px;display: block;' width='20'></td>
                     <td><p style='Margin: 5px'>+374 """+student.phone_number+"""</p></td>
                  </tr>
                  <tr>
                    <td> <img src='https://i.imgur.com/3AY8Qd5.png' style='Margin-right: 10px;display: block;' width='20'></td>
                     <td><p style='Margin: 5px'>"""+student.email+"""</p></td>
                  </tr>
                  <tr>
                    <td> <i class="fas fa-map-marker-alt" style='Margin-right: 10px;display: block; color: #548eff;' width='20'></i></td>
                     <td><p style='Margin: 5px'>"""+student.address+"""</p></td>
                  </tr>

                </table>
              </td>
            </tr>
              <tr  align='center'>
                <td align='left'><p  style='color:#272727;font:bold 20px sans-serif'>"""+student.first_name+""" """+student.last_name+"""</p></td>
            </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                  <tr>
                    <td align='leftmargin'><h1 style='color: #31597B;font:bold 25px sans-serif;Margin-top: 30px;'>Դասընթացի մասին`</h1> </td>
                  </tr>
                </table>
              </td>
            </tr>
              <tr>
                    <td>
                      <table align='center' bgcolor='#F6FAFF' width='100%' style='border-radius: 10px;width: 100%;max-width: 1050px;padding: 10px;'>
                        <tr>
                          <td>
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                  <tr>
                     <td><h1 style='font:bold 18px sans-serif'>Front-End Web Development</h1></td>
                  </tr>
                  <tr>
                    <td>
                       <p style='color: #707479;font:18px sans-serif'>
                                                 """+component+"""
                                              </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                         <tr style='font: 20px sans-serif'>
                                                     <td><p >Դասընթացի տևողությունը՝</p></td>
                                                     <td><p style='Margin:6px'>"""+str(months)+""" ամիս</p>
<!--                                                      <p style='Margin:6px'>3 $perweek</p>
                                                     <p style='Margin:6px'>2 $hoursdur</p> -->
                                                     </td>
                                                  </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!--   <tr>
                    <td>
                      <table  border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                        <tr>
                          <td width='70%'>
                            <p style='font: 20px sans-serif'>$members_count</p>
                          </td>
                          <td align='left'><h1 style='font:bold 25px sans-serif;Margin-top:20px;'>$students_count</h1></td>
                        </tr>
                      </table>
                    </td>
                  </tr> -->
<!--                   <tr>
                    <td>
                      <table  border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                        <tr>
                          <td>
                            <h1 style='color: #31597B;font:bold 25px sans-serif'>$monthpay</h1>
                          </td>
                          <td><h1 style='font:bold 25px sans-serif'>$month_fee $dram</h1></td>
                        </tr>
                      </table>
                    </td>
                  </tr> -->
          </table>
        </td>
      </tr>
    </table>
      </td>
    </tr>
    <tr>
      <td>
        <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
          <tr>
            <td>
              <table class="table1" border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                       
                                    <thead>
                                    """+head_table+"""
                                    </thead>
                                    <tbody>
                               
                             """+data+"""
                             
                                    </tbody>
                      
         
              </table>
                                     <div class="total1">
                                    <span>Ընդամենը՝</span>
                                    <h2>"""+str(payment_student_all)+""" AMD</h2>
                                </div>

            </td>
          </tr>
        </table>
         <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
           <thead>
             <th>Խնդրում ենք չպատասխանել այս նամակին։ Մենք կկապվենք Ձեզ հետ:<br>Եթե ունեք հարցեր խնդրում ենք կապ հաստատել մեզ հետ մեր վեբ կայքի միջոցով կամ զանգահարել հետևյալ հեռախոսահամարներով՝ +374 98 75-73-50, +374 55 75-73-50, +374 75-73-50 ։</th>
           </thead>
         </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
        print( message['To'])
        if  message['To']:
            print('ka')
        else:
            print('chka')
        message['Subject'] = '..'
        message.attach(MIMEText(mail_content, 'plain'))
        part2 = MIMEText(html, 'html')
        message.attach(part2)
        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.starttls()
        session.login(sender_address, sender_pass)
        text = message.as_string()
        session.sendmail(sender_address, receiver_address, text)
        session.quit()
        
        return True
    except Exception as e:
        print(e)
@app.task
def add(x):
    return print(x,10+15)
@app.task
def send_mail_payment_studnet(id,end_payment):
    try:
        student=Students.objects.filter(id=id).get()
        data_start_cantract_studnet=datetime.datetime.strptime(student.contract_start,"%Y-%m-%d")+timedelta(days=3)
        data_end_cantract_studnet=datetime.datetime.strptime(student.contract_end,"%Y-%m-%d")+timedelta(days=3)
        receiver_address=student.email
        payment_all=Payment_student.objects.filter(parent_studnet=student)
        all_payment=0
        data=''
        head_table=''
        for i in payment_all:
          head_table=""" 
                
                      <th>Ամսաթիվ</th>
                      <th>Վճարված Գումար</th>

                """
          data1=""" 
                   <tr>
                       <td>"""+i.data.strftime("%d.%m.%Y")+"""</td>
                       <td>"""+str(i.paid_amount)+"""դ</td>

                  </tr>
                """

          data+=data1
          all_payment+=int(i.paid_amount)

        print(data)
        mail_content = ''
        sender_address = 'nubaryan.razmik1998@gmail.com'
        sender_pass = '098398968++'
        message = MIMEMultipart()
        message['From'] = sender_address
        message['To'] = receiver_address
        html= """
<!DOCTYPE html>
<html>
<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' /><!-- Define Charset -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' /><!-- Responsive Meta Tag -->
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0' name='viewport'/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='x-apple-disable-message-reformatting' />

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
      <style type="text/css">
        .table1 {
    width: 700px;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
}

.table1 td,
.table1 th {
    width: 100%;
    max-width: 94%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
}

.table1 th {
    background-color: #F5F9FA;
    color: #000000;
}
.total1 {
    margin-right: 20px;
    float: right;
    display: flex;
    text-align: center;
    align-items: center;
}
.total1 h2 {
    width: 200px;
}
.total1 span {
    color: grey;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
      </style>
    <title></title>
</head>
<body leftmargin='0' marginheight='0' marginwidth='0' topmargin='0'  bgcolor='#F2F2F2'>
  <table width='100%'  style='background-image: url(https://i.imgur.com/e6f8Fq3.png);background-size:cover;background-repeat: no-repeat;'>
    <tr>
      <td align='center' width='100%' >
        <table   border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;'>
      <tr>
        <td align='center'>
          <img src='https://i.imgur.com/3kxM3kk.png' width='200' style='Margin-top:50px;display: block;'>
        </td>
      </tr>
      <tr>
          <td align='center'>
          <h1 style='font-family: sans-serif;font-weight: bold;font-size: 40px;color: #272727;line-height:55px'> Կոլիբրիլաբ ուսումնական թիմ։<br>
          Contract Number """+student.contract_number+"""</h1>
        </td>
      </tr>

      <tr>
        <td align='center' style=" text-align: end;">
           <p style='font-family: sans-serif;font-weight: bold;font-size: 23px;color: #272727'>Contract Start """+student.contract_start+"""</p>
            <p style='font-family: sans-serif;font-weight: bold;font-size: 23px;color: #272727'>Contract end """+student.contract_end+"""</p>
        </td>
      </tr>
      <tr>
        <td align='center'>
          <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
            <tr>
              <td>
                <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='border-bottom: 1px solid #A6A6A6'>
                  <tr>
                    <td>
                      <table style='width: 100%;max-width: 900px' align='center'>
                        <tr align='center'>
               <td align='left'><h1 style='color: #31597B;font:bold 25px sans-serif'>Մասնակից՝</h1></td>
              <td rowspan='2' style='color:#272727;font:bold 18px sans-serif;'>
                <table align='center' >
                  <tr>
                    <td> <img src='https://i.imgur.com/L93dOWv.png' style='Margin-right: 10px;display: block;' width='20'></td>
                     <td><p style='Margin: 5px'>+374 """+student.phone_number+"""</p></td>
                  </tr>
                  <tr>
                    <td> <img src='https://i.imgur.com/3AY8Qd5.png' style='Margin-right: 10px;display: block;' width='20'></td>
                     <td><p style='Margin: 5px'>"""+student.email+"""</p></td>
                  </tr>
                  <tr>
                    <td> <i class="fas fa-map-marker-alt" style='Margin-right: 10px;display: block; color: #548eff;' width='20'></i></td>
                     <td><p style='Margin: 5px'>"""+student.address+"""</p></td>
                  </tr>

                </table>
              </td>
            </tr>
              <tr  align='center'>
                <td align='left'><p  style='color:#272727;font:bold 20px sans-serif'>"""+student.first_name+""" """+student.last_name+"""</p></td>
            </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>

                </table>
              </td>
            </tr>
              <tr>
                    <td>
                      <table align='center' bgcolor='#F6FAFF' width='100%' style='border-radius: 10px;width: 100%;max-width: 1050px;padding: 10px;'>
                        <tr>
                          <td>
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                    <td>
                      <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                         <tr style='font: 20px sans-serif'>
                                                     <td><p >Դուք Կատարել եք Հեթական վճարումը  """+end_payment+"""  ՀՀ դրամ՝</p></td>
                                               
                                                  </tr>
                                                  
                      </table>
                    </td>
                  </tr>
                </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!--   <tr>
                    <td>
                      <table  border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                        <tr>
                          <td width='70%'>
                            <p style='font: 20px sans-serif'>$members_count</p>
                          </td>
                          <td align='left'><h1 style='font:bold 25px sans-serif;Margin-top:20px;'>$students_count</h1></td>
                        </tr>
                      </table>
                    </td>
                  </tr> -->
<!--                   <tr>
                    <td>
                      <table  border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                        <tr>
                          <td>
                            <h1 style='color: #31597B;font:bold 25px sans-serif'>$monthpay</h1>
                          </td>
                          <td><h1 style='font:bold 25px sans-serif'>$month_fee $dram</h1></td>
                        </tr>
                      </table>
                    </td>
                  </tr> -->
          </table>
        </td>
      </tr>
    </table>
      </td>
    </tr>
    <tr>
      <td>
        <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
          <tr>
            <td>
              <table class="table1" border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 900px;'>
                       
                                    <thead>
                                    """+head_table+"""
                                    </thead>
                                    <tbody>
                               
                             """+data+"""
                             
                                    </tbody>
                      
         
              </table>
                                     <div class="total1">
                                    <span>Ընդանուր վճարված Գումարը՝</span>
                                    <h2>"""+str(all_payment)+""" AMD</h2>
                                </div>

            </td>
          </tr>
        </table>
         <table border='0' cellpadding='0' cellspacing='0' width='100%' align='center' style='width: 100%;max-width: 1140px;border:1px solid #A6A6A6;border-radius: 10px;Margin-top: 20px;padding: 20px 0' bgcolor='#FFFFFF'>
           <thead>
             <th>Խնդրում ենք չպատասխանել այս նամակին։ Մենք կկապվենք Ձեզ հետ:<br>Եթե ունեք հարցեր խնդրում ենք կապ հաստատել մեզ հետ մեր վեբ կայքի միջոցով կամ զանգահարել հետևյալ հեռախոսահամարներով՝ +374 98 75-73-50, +374 55 75-73-50, +374 75-73-50 ։</th>
           </thead>
         </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
        print( message['To'])
        if  message['To']:
            print('ka')
        else:
            print('chka')
        message['Subject'] = '..'
        message.attach(MIMEText(mail_content, 'plain'))
        part2 = MIMEText(html, 'html')
        message.attach(part2)
        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.starttls()
        session.login(sender_address,sender_pass)
        text = message.as_string()
        session.sendmail(sender_address, receiver_address, text)
        session.quit()
        return True
    except Exception as e:
        print(e)
@app.task
def request_Backend(host,data_requests):
    print('mta',host,data_requests)
    try:
        print(host)
        r =  requests.post(host,data = data_requests)
        return r.json()
    except Exception as e:
        print(e,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        return None



