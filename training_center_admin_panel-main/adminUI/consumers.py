from logging import fatal
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from channels.consumer import AsyncConsumer
from django.http import JsonResponse








# def retoken(token):
#     import jwt
#     from pytz import UTC
#     from datetime import datetime, timedelta
#     try:
#         token_data = jwt.decode(token, 'asdasdasdasdasd', verify=False)
#         print(token,token_data)
#         valid_till = datetime.now(UTC) + timedelta(hours=24*7)
#         token_data['last_name']= token_data['last_name']
#         token_data['first_name']=token_data['first_name']
#         token_data['role']=token_data['role']
#         token_data['image']=token_data['image']
   

#         token = jwt.encode(token_data, 'asdasdasdasdasd', algorithm='HS256')
#         return True,token.decode('utf-8'),token_data
#     except:
#         return False


class ChatConsumer(WebsocketConsumer):


    def connect(self):
        if 'login' in self.scope['session']:
            # print(self.scope['client'][1])
            print(self.groups)
            # retoken(self.scope['session']['login'])
            self.room_name = self.scope['url_route']['kwargs']['chat_id']
            self.room_group_name = 'chat_%s' % self.room_name

            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            # self.disconnect(1006)
            self.accept()
        else:
            return JsonResponse({'no_conect':'no'})
            



  

    def disconnect(self, close_code):
        if 'login' in self.scope['session']:
  
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )
        else:
    
            return JsonResponse({'no_conect':'no'})


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        if 'reading_message' in text_data_json:
            reading_message = text_data_json['reading_message']
            id_mesage = text_data_json['id_mesage']

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'reading_message': reading_message,
                    'id_mesage':id_mesage,
   

                }
            )
        else:
            message = text_data_json['message']
            username_id = text_data_json['username_id']
            id_mesage = text_data_json['id_mesage']
            data = text_data_json['data']
            to_id_user = text_data_json['id_to_user']
            img_send_user = text_data_json['img_send_user']
            file_message_url = text_data_json["file_message_url"]
        


            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'username_id': username_id,
                    'id_mesage':id_mesage,
                    'data':data,
                    'to_id_user':to_id_user,
                    'img_send_user':img_send_user,
                    'file_message_url':file_message_url

                }
            )

    def chat_message(self, event):
        print(event)
        
        if 'reading_message' in event:
            
            reading_message = event['reading_message']
            id_mesage = event['id_mesage']
    
    
            self.send(text_data=json.dumps({
                'event': "Send",
                'reading_message': reading_message,
                'id_mesage':id_mesage,

            }))
            pass
        else:


       
            message = event['message']
            username_id = event['username_id']
            id_mesage = event['id_mesage']
            data = event['data']
            to_id_user = event['to_id_user']
            img_send_user = event['img_send_user']
            file_message_url = event["file_message_url"]

            self.send(text_data=json.dumps({
                'event': "Send",
                'message': message,
                'username_id': username_id,
                'id_mesage':id_mesage,
                'data':data,
                'to_id_user':to_id_user,
                'img_send_user':img_send_user,
                'file_message_url':file_message_url
            }))
class Chat_tayping_Consumer(WebsocketConsumer):


    def connect(self):


        if 'login' in self.scope['session']:
            print(self.groups)
            self.room_name = self.scope['url_route']['kwargs']['chat_id']+"_is_tayping"
            self.room_group_name = 'chat_%s' % self.room_name
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        else:
            return JsonResponse({'no_conect':'no'})
  

    def disconnect(self, close_code):
  
        if 'login' in self.scope['session']:
  
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )
        else:
            return JsonResponse({'no_conect':'no'})

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
    
   

        is_tayping = text_data_json['is_tayping']
        to_user_id = text_data_json['to_user_id']



        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'is_tayping': is_tayping,
                'to_user_id' : to_user_id,


            }
        )

    def chat_message(self, event):

        print(event)
        is_tayping = event['is_tayping']
        to_user_id = event['to_user_id']


        self.send(text_data=json.dumps({
            'event': "Send",
            'is_tayping': is_tayping,
            'to_user_id': to_user_id,

        }))


class Chat_actions_Consumer(WebsocketConsumer):
    def connect(self):
        if 'login' in self.scope['session']:
            print(self.groups)
            self.room_name = self.scope['url_route']['kwargs']['chat_id']+"_actions"
            self.room_group_name = 'chat_%s' % self.room_name
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        else:
            return JsonResponse({'no_conect':'no'})
  

    def disconnect(self, close_code):
  
        if 'login' in self.scope['session']:
  
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )
        else:
            return JsonResponse({'no_conect':'no'})

    def receive(self, text_data):
        
        text_data_json = json.loads(text_data)

        print(text_data_json)
        if text_data_json['actions']=='edit':

            edit_message_id = text_data_json['edit_message_id']
            edit_message_text = text_data_json['edit_message_text']
            tu_users_id = text_data_json['tu_users_id']
            actions = text_data_json['actions']
    
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'actions': actions,
                    'edit_message_id': edit_message_id,
                    'edit_message_text' : edit_message_text,
                    'tu_users_id' : tu_users_id,

                }
            )
        elif text_data_json['actions']=='delete':
            actions = text_data_json['actions']
            delete_message_id = text_data_json['delete_message_id']
            tu_users_id = text_data_json['tu_users_id']
         
    
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'actions': actions,
                    'delete_message_id': delete_message_id,
                    'tu_users_id' : tu_users_id,

                }
            )



    def chat_message(self, event):
        if event['actions']=='edit':
            print(event)
            actions = event['actions']
            edit_message_id = event['edit_message_id']
            edit_message_text = event['edit_message_text']
            tu_users_id = event['tu_users_id']
            self.send(text_data=json.dumps({
                'event': "Send",
                'edit_message_id': edit_message_id,
                'edit_message_text': edit_message_text,
                'tu_users_id': tu_users_id,
                'actions': actions,

            }))
        elif event['actions']=='delete':
            print(event)
            actions = event['actions']
            delete_message_id = event['delete_message_id']
            tu_users_id = event['tu_users_id']
            self.send(text_data=json.dumps({
                'event': "Send",
                'delete_message_id': delete_message_id,
                'tu_users_id': tu_users_id,
                'actions': actions,

            }))












