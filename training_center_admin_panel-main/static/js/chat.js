var start=true
var start_tayping_user=true
var scrol_number_start=0
var scrol_number_end=10

function scrol_message(scrol_number,id,role,scrol_number_finish, lastElement){
  $.ajax({
    method: "POST",
    url: "/chat/"+id+"/",
    dataType: 'json',
    data:{'sech_user_message_id':id,'role':role,'scrol_number_start':scrol_number,'scrol_number_end':scrol_number_finish},
    cache : false,
    }).done(function(res){
      var chat=$('#chat_users'+id)

      let message_chat=res['messige']
      // let message_id=[]
      for(let i=0; i < message_chat.length;i++){
          // console.log(message_chat[i]['from'])
          // message_id.append(message_chat[i]['id'])

          if (message_chat[i]['from']){
              messige=`
              <div class="media w-50 ml-auto mb-3" id='body_user_message${message_chat[i]['id']}'>
              <div class="media-body">
                <div class="bg-primary rounded py-2 px-3 mb-2" id="mesige_socket${message_chat[i]['id']}">
                  <p class="text-small mb-0 text-white" style="word-break: break-all;" id='message_text_id_${message_chat[i]['id']}' >${message_chat[i]['message']}</p>
                  <div style="display: flex; justify-content: flex-end">
                    <a href='' data-toggle="modal" data-target="#exampleModal1"  onclick="edit_message(${message_chat[i]['id']});return false;"><i class="fas fa-edit" style="padding: 3px;"></i></a>
                    <a href=''  data-toggle="modal" data-target="#modal_delet_message" onclick="delete_message(${message_chat[i]['id']});return false;"><i class="far fa-trash-alt" ></i></a>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <p class="small text-muted">${message_chat[i]['data']}</p>
                  <div id="check_reading${message_chat[i]['id']}">  </div>
                </div>
              </div>
             
            </div>
    
              `

          }
          else{
              messige=`
              <div class="media w-50 mb-3"  id="body_user_message${message_chat[i]['id']}"><img src="${message_chat[i]['img_parent_user']}" alt="user" width="50" class="rounded-circle">
              <div class="media-body ml-3">
                <div class="bg-light rounded py-2 px-3 mb-2"  id="mesige_socket${message_chat[i]['id']}">
                  <p class="text-small mb-0 text-muted" id='message_text_id_${message_chat[i]['id']}'>${message_chat[i]['message']}</p>
                </div>
                <p class="small text-muted">${message_chat[i]['data']}</p>
              </div>
            </div>
    
              `
          }
          chat.prepend(messige)
          // console.log(message_chat[i]['status'])
          if (message_chat[i]['status']){
            // console.log('mta')
            let reading_message_cheack=`
            <img src="/static/logo/blue_chck.jpg/" style="width: 27px;height: 21px;">
            `
            $("#check_reading"+message_chat[i]['id']).html(reading_message_cheack)
          }
          else{
            console.log('mtaaaaaa')
            let reading_message_cheack=`
            <img src="/static/logo/image.png/" style="width: 27px;height: 21px;">
            `
            $("#check_reading"+message_chat[i]['id']).html(reading_message_cheack)

          }
          

          
      }
      // message _fileee _append
      for(let i=0; i < res['message_file'].length;i++){
        console.log(res['message_file'][i])
        let file_message_append=`
        <a href="${res['message_file'][i]['url_image']}" target="_blank"><img src="${res['message_file'][i]['url_image']}" width="190" height="190" ></a>
        `
        console.log(res['message_file'][i]['id_message'])
        $("#mesige_socket"+res['message_file'][i]['id_message']).prepend(file_message_append)
      }



  


      var childPos = $("#"+lastElement).offset();
      var parentPos = $("#chat_users"+id).offset();
      var childOffset = {
          top: childPos.top - parentPos.top,
          left: childPos.left - parentPos.left
      }

      $("#chat_users"+id).animate({
        scrollTop: childOffset.top - 32
      }, 0);


      // parentPos.scrollTop = lastElement.offsetTop

      console.log(childOffset)

    
    })

}






function serch_mesage(id,role){
  let input_placeholder_lang = $("#type_message_leng").val()
    console.log('clicked 77')
    $('#message_all_notreeding'+id).html('')
    
    var bodt_input_chat=$('#body_chat').html(`      
    
    <div class="px-4 py-5 chat-box bg-white" id='chat_users${id}'>

  </div>
  <!-- Typing area -->
  <div  class="bg-light" id='input_button_chat'>
  <div id='is_tayping${id}'>
  
  </div>
    <div class="input-group">
      <input type="text" placeholder="${input_placeholder_lang}" aria-describedby="button-addon2" class="form-control emojiable-option rounded-0 border-0 py-4 bg-light" id='messige_text' data-id=${id}>

      
            <form action="url" enctype="multipart/form-data" id="form">
                 <div class="input-images"></div>
              
            </form>



      <div class="input-group-append">
      
        <button id="button-addon2" onclick="send_message(${id},'${role}')" class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
`
    )

    var chat=$('#chat_users'+id).html('')
    $(function(){
      $('.input-images').imageUploader();
    });
    
    // $('#form').on('submit', function (event) {

    //   event.preventDefault();
    //   event.stopPropagation();

    //   // Get some vars
    //   let $form = $(this);
    //   let $inputImages = $form.find('input[name^="images"]');

    //   console.log($inputImages.val())
      

    // })


  let serch_div=$('.list-group-item.list-group-item-action.active.text-white.rounded-0').removeClass('active text-white rounded-0')
  console.log(serch_div,'asssssssssssssssssssss')
  serch_div.addClass('list-group-item-light rounded-0')
  let div_mesage=$('#user_'+id).removeClass('list-group-item-light rounded-0')
  div_mesage=$('#user_'+id).addClass('active text-white rounded-0')
  $('#text_mesage'+id).attr('style', 'color: #99a09d !important');
  var input= document.getElementById('messige_text')
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("button-addon2").click();
    }
  });

  $('#messige_text').emojiPicker({
    width:'200',
    height:'350',
    position:'right',
    fadeTime: 100,
    iconColor:'black',
    iconBackgroundColor:'#eee',
    recentCount: 36,
    emojiSet:'apple',
    container:'body',
    button:true
  });
   scrol_number_start=0
   scrol_number_end=10

  $.ajax({
    method: "POST",
    url: "/chat/"+id+"/",
    dataType: 'json',
    data:{'sech_user_message_id':id,'role':role,"scrol_number_start":scrol_number_start,'scrol_number_end':scrol_number_end},
    cache : false,
    }).done(function(res){
        // console.log(res)
        if (res['new_message']){
          var chatSocket_reading_message = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+"/");
  
          chatSocket_reading_message.onopen = () => chatSocket_reading_message.send(JSON.stringify({
          'reading_message': 'yes',
          'id_mesage':res['new_message_id'],
                }))
          setTimeout(function(){ chatSocket_reading_message.close()  }, 600);

        }
       
        let message_chat=res['messige']
        // let message_id=[]
        for(let i=0; i < message_chat.length;i++){
            // console.log(message_chat[i]['from'])
            // message_id.append(message_chat[i]['id'])

            if (message_chat[i]['from']){
                messige=`
                <div class="media w-50 ml-auto mb-3" id='body_user_message${message_chat[i]['id']}'>
                <div class="media-body">
                  <div class="bg-primary rounded py-2 px-3 mb-2" id="mesige_socket${message_chat[i]['id']}">
                    <p class="text-small mb-0 text-white" style="word-break: break-all;" id='message_text_id_${message_chat[i]['id']}' >${message_chat[i]['message']}</p>
                    <div style="display: flex; justify-content: flex-end">
                      <a href='' data-toggle="modal" data-target="#exampleModal1"  onclick="edit_message(${message_chat[i]['id']});return false;"><i class="fas fa-edit" style="padding: 3px;"></i></a>
                      <a href=''  data-toggle="modal" data-target="#modal_delet_message" onclick="delete_message(${message_chat[i]['id']});return false;"><i class="far fa-trash-alt" ></i></a>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center">
                    <p class="small text-muted">${message_chat[i]['data']}</p>
                    <div id="check_reading${message_chat[i]['id']}">  </div>
                  </div>
                </div>
               
              </div>
      
                `

            }
            else{
                messige=`
                <div class="media w-50 mb-3"  id="body_user_message${message_chat[i]['id']}"><img src="${message_chat[i]['img_parent_user']}" alt="user" width="50" class="rounded-circle">
                <div class="media-body ml-3">
                  <div class="bg-light rounded py-2 px-3 mb-2"  id="mesige_socket${message_chat[i]['id']}">
                    <p class="text-small mb-0 text-muted" id='message_text_id_${message_chat[i]['id']}'>${message_chat[i]['message']}</p>
                  </div>
                  <p class="small text-muted">${message_chat[i]['data']}</p>
                </div>
              </div>
      
                `
            }
            chat.prepend(messige)
            // console.log(message_chat[i]['status'])
            if (message_chat[i]['status']){
              // console.log('mta')
              let reading_message_cheack=`
              <img src="/static/logo/blue_chck.jpg/" style="width: 27px;height: 21px;">
              `
              $("#check_reading"+message_chat[i]['id']).html(reading_message_cheack)
            }
            else{
              console.log('mtaaaaaa')
              let reading_message_cheack=`
              <img src="/static/logo/image.png/" style="width: 27px;height: 21px;">
              `
              $("#check_reading"+message_chat[i]['id']).html(reading_message_cheack)

            }
            

            
        }
        // message _fileee _append
        for(let i=0; i < res['message_file'].length;i++){
          console.log(res['message_file'][i])
          let file_message_append=`
          <a href="${res['message_file'][i]['url_image']}" target="_blank"><img src="${res['message_file'][i]['url_image']}" width="190" height="190" ></a>
          `
          console.log(res['message_file'][i]['id_message'])
          $("#mesige_socket"+res['message_file'][i]['id_message']).append(file_message_append)
        }

        var element = document.getElementById("chat_users"+id);

        element.addEventListener('scroll', function(e) {
          if (element.scrollTop === 0) {
            let lastChat = document.querySelectorAll('.media.w-50')[0];
            setTimeout(() => {
              scrol_number_start+=11
              scrol_number_end+=11
              scrol_message(scrol_number_start,id,role,scrol_number_end, lastChat.getAttribute('id'));
              // element.scrollTop = document.getElementById(lastChat.getAttribute('id')).scrollHeight
            }, 1000)
            
          }
        })

        element.scrollTop = element.scrollHeight;

        $('#messige_text').on('keyup',function(){
          if (start_tayping_user){
            is_tayping(id)
            start_tayping_user=false
            setTimeout(function(){ start_tayping_user=true  }, 3000);

          }
        
        })



    

    })
}


function send_message(id,role){
    console.log($('#form'))
    let form=$('#form')
    let inputImages = form.find('input[name^="images"]');
    var f_obj = inputImages.get(0).files;
    var message=$('#messige_text').val()
    if (message.length!=0 || f_obj.length!=0){
      $('#messige_text').val('')
      
      let formData = new FormData();
      for (let i=0;i<f_obj.length;i++){
        formData.append('file'+i, f_obj[i]);
      }
      formData.append('id', id);
      formData.append('role', role);
      formData.append('send_mesasage_text',message);
           $.ajax({
               method: "POST",
               url: "/chat/"+id+"/",
               dataType: 'json',
               enctype: 'multipart/form-data',
               processData: false,
               contentType: false,
               data:formData,
               cache : false,
               }).done(function(res){
                 $('.delete-image').click()
                 
               
                   console.log(res)
                   var chat=$('#chat_users'+id)
                    // message__________________________________________________-
                   messige=`
                 <div class="media w-50 ml-auto mb-3" id='body_user_message${res['message'][0]['id']}'>
                 <div class="media-body">
                   <div class="bg-primary rounded py-2 px-3 mb-2" id="mesige_socket${res['message'][0]['id']}">
                     <p class="text-small mb-0 text-white"  style="word-break: break-all;" id='message_text_id_${res['message'][0]['id']}' >${message}</p>
                     <div style="display: flex; justify-content: flex-end">
                     <a href='' data-toggle="modal" data-target="#exampleModal1"  onclick="edit_message(${res['message'][0]['id']});return false;"><i class="fas fa-edit"></i></a>
                     <a href=''  data-toggle="modal" data-target="#modal_delet_message" onclick="delete_message(${res['message'][0]['id']});return false;"><i class="far fa-trash-alt" ></i></a>
                     </div>
                     </div>
                 
                   <div style="display: flex; justify-content: space-between; align-items: center">
                   <p class="small text-muted">${res['data']}</p>
                   <div id="check_reading${res['message'][0]['id']}"> <img src="/static/logo/image.png/" style="width: 27px;height: 21px;"></div>
               
                 </div>
               </div>

                   `
                  //  onclick="delete_message(${res['message'][0]['id']});return false;"

                   console.log(res['tu_users_info'])
                   chat.append(messige)
                  //  messsageeee order by time list user send_message _________________________________--
 
                  let users_table_update=$('#user_'+res['id_to_user'])
                  $('#user_'+res['id_to_user']).remove()
                  $("#users_table").prepend(users_table_update)

                  
                  let div_mesage=$('#user_'+res['id_to_user']).removeClass('list-group-item-light rounded-0')
                  div_mesage=$('#user_'+res['id_to_user']).addClass('active text-white rounded-0')
                   $("#text_mesage"+res['id_to_user']).html(`<p>${message}</p>`)




                  //  _____________________________________________________




                   for (let i=0;i<res['file_message'].length;i++){
                    let file_message_append=`
                    <a href='${res['file_message'][i]}' target="_blank"><img src="${res['file_message'][i]}" width="190" height="190"></a>
                    `
                    $("#mesige_socket"+res['message'][0]['id']).append(file_message_append)
                  }
                   var element = document.getElementById("chat_users"+id);
                   console.log(element.scrollHeight, 'element.scrollHeight')
                   element.scrollTop = element.scrollHeight;

                   var chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/');

                 chatSocket.onopen = () => chatSocket.send(JSON.stringify({
                   'message': message,
                   'username_id':res['id_username'],
                   'id_mesage':res['message'][0]['id'],
                   'data':res['data'],
                   'id_to_user':res['id_to_user'],
                   'img_send_user':res['img_send_user'],
                   'file_message_url':res['file_message'],
               }));
               setTimeout(function(){ chatSocket.close()  }, 1000);
              


             
             


               })
             
             }
}
$.ajax({
  method: "POST",
  url: "/chat/",
  dataType: 'json',
  data:{'get_room_name':'yes'},
  cache : false,
  }).done(function(res){


      // chatSocket     new message
    var chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/');
    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data)
        var message = data['message'];
        if ('reading_message' in data){
          console.log('kpaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacheck_reading609')
          for(let i=0;i<data['id_mesage'].length;i++){
            $('#check_reading'+data['id_mesage'][i]).html(`
            <img src="/static/logo/blue_chck.jpg/" style="width: 27px;height: 21px;">
            
            `)
            
          }


        }
        else{
          console.log(  $('text_mesage'+data['username_id']))

          //  __________________________________________________________________
          // updete users list 

          let users_table_update=$('#user_'+data['username_id'])
          console.log(users_table_update)
          $('#user_'+data['username_id']).remove()
          $("#users_table").prepend(users_table_update)


          //  __________________________________________________________________






          $('#text_mesage'+data['username_id']).html('<b>'+message+'</b>')
          $('#text_mesage'+data['username_id']).attr('style', 'color:  #000000 !important');
          messige=`
                  <div class="media w-50 mb-3" id='1'><img src="${data['img_send_user']}" alt="user" width="50" class="rounded-circle">
                  <div class="media-body ml-3">
                    <div class="bg-light rounded py-2 px-3 mb-2" id='mesige_socket${data['id_mesage']}'>
                      <p class="text-small mb-0 text-muted" id='message_text_id_${data['id_mesage']}'>${message}</p>
                    </div>
                    <p class="small text-muted">${data['data']}</p>
                  </div>
                  </div>
  
                  `
                  $("#chat_users"+data['username_id']).append(messige)
                  $(document).find('#body_chat').find('#is_tayping'+data['to_user_id']).html('')
                  for (let i=0;i<data['file_message_url'].length;i++){
                    let file_message_append=`
                    <a href='${data['file_message_url'][i]}' target="_blank"><img src="${data['file_message_url'][i]}" width="190" height="190"></a>
                    `
                    $("#mesige_socket"+data['id_mesage']).append(file_message_append)
                  }
  
  
  
  

                  let find_div_messige = $(document).find('#body_chat').find('#chat_users'+data['username_id'])
      
                  if (find_div_messige.length!=0){
                    var element = document.getElementById("chat_users"+data['username_id']);
                    console.log(element.scrollHeight, 'element.scrollHeight')
                    element.scrollTop = element.scrollHeight;
                    console.log(element.scrollTop, 'scroll bottom');

                    $.ajax({
                      method: "POST",
                      url: "/chat/",
                      dataType: 'json',
                      data:{'chat_filtr_reading':'yes','id_tu_user':data['username_id']},
                      cache : false,
                      }).done(function(res){
                        console.log(res['room_name'])
                        $('#sms_number').html(res['not_reading_message'])
                        $('#is_tayping'+data['username_id']).html('')
                        var chatSocket_reading_message = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+"/");
                        var id_new_message_reading = []
                        id_new_message_reading.push(data['id_mesage'])
  
                        chatSocket_reading_message.onopen = () => chatSocket_reading_message.send(JSON.stringify({
                        'reading_message': 'yes',
                        'id_mesage':id_new_message_reading,
                              }))
                        setTimeout(function(){ chatSocket_reading_message.close()  }, 600);
  
                      })
                  }
                          };
          chatSocket.onclose = function(e) {
       
          };

        }


        // chatSocket     tayping
       
        var chatSocket_tayping = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/is_tayping/');
        chatSocket_tayping.onmessage = function(e) {
          var data = JSON.parse(e.data);
          let find_div_is_tayping = $(document).find('#body_chat').find('#is_tayping'+data['to_user_id'])
          console.log(find_div_is_tayping.length)
          if (find_div_is_tayping.length!=0){
            function start_tayping(){
              start=true
              find_div_is_tayping.html('')
            }
            if (start){
              let is_tayping_html=`
              <div id="fountainTextG"><div id="fountainTextG_1" class="fountainTextG">I</div><div id="fountainTextG_2" class="fountainTextG">s</div><div id="fountainTextG_3" class="fountainTextG"> </div><div id="fountainTextG_4" class="fountainTextG">T</div><div id="fountainTextG_5" class="fountainTextG">a</div><div id="fountainTextG_6" class="fountainTextG">y</div><div id="fountainTextG_7" class="fountainTextG">p</div><div id="fountainTextG_8" class="fountainTextG">i</div><div id="fountainTextG_9" class="fountainTextG">n</div><div id="fountainTextG_10" class="fountainTextG">g</div></div> `
              find_div_is_tayping.html(is_tayping_html)
              start=false
              setTimeout(function(){ start_tayping() }, 3000);
            }
            
          }

        }


      // chatSocket actions edit delete

      var chatSocket_actions_message = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'_actions/actions/');
      chatSocket_actions_message.onopen = () => console.log('kpa')
      chatSocket_actions_message.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data)

        find_div_actions_message = $(document).find('#body_chat').find('#is_tayping'+data['tu_users_id'])
        console.log(find_div_actions_message.length,'asasasasasasasasasasas')
        if (find_div_actions_message.length!=0){
          if (data['actions']=='edit'){
            console.log('anum_em ')
            $("#message_text_id_"+data['edit_message_id']).html(data['edit_message_text'])
            

          }
          else if  (data['actions']=='delete'){
            $('#body_user_message'+data['delete_message_id']).remove()

          }





        }



      }










  })


function is_tayping(id){
  $.ajax({
    method: "POST",
    url: "/chat/",
    dataType: 'json',
    data:{'get_room_name_is_tayping':'yes','id_parent_user':id},
    cache : false,
    }).done(function(res){
      var chatSocket_tayping = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/is_tayping/');

      chatSocket_tayping.onopen = () => chatSocket_tayping.send(JSON.stringify({
      'is_tayping': 'yes',
      'to_user_id':res['from_id'],
            }))
      setTimeout(function(){ chatSocket_tayping.close()  }, 600);


    })

  
}
function edit_message(id){
 let text_input=$("#message_text_id_"+id).text()
 console.log(text_input)
 $("#edit_text_message").val(text_input)
 $("#edit_text_message_id").val(id)
}
function save_edit_message(){
  let edit_text= $("#edit_text_message").val()
  if (edit_text.length!=0){
    let id =  $("#edit_text_message_id").val()
    $("#close_modal_edit").click()
    $.ajax({
      method: "POST",
      url: "/chat/actions/"+id+"/",
      dataType: 'json',
      data:{'edit_message_text':edit_text},
      cache : false,
      }).done(function(res){
        console.log(res)
        $("#message_text_id_"+id).html(edit_text)

        var chatSocket_actions = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/actions/');
        chatSocket_actions.onopen = () => chatSocket_actions.send(JSON.stringify({
        'actions': 'edit',
        'edit_message_id':res['id_message'],
        'edit_message_text':res['edit_message'],
        'tu_users_id':res['tu_users_id'],

              }))

        setTimeout(function(){ chatSocket_actions.close()  }, 1000);
      })
  }
}
function delete_message(id){
  $("#delete_message_id").val(id)
}

function save_delete_message(method){
  let id = $("#delete_message_id").val()
  $.ajax({
    method: "POST",
    url: "/chat/actions/"+id+"/",
    dataType: 'json',
    data:{'dlete_message_id':id,'method':method},
    cache : false,
    }).done(function(res){
      $("#close_modal_delete").click()
      if(res['many']){
        $('#body_user_message'+id).remove()

      }
      else{
        $('#body_user_message'+id).remove()
        var chatSocket_actions = new WebSocket('ws://' + window.location.host + '/ws/chat/'+res['room_name']+'/actions/');
        chatSocket_actions.onopen = () => chatSocket_actions.send(JSON.stringify({
        'actions': 'delete',
        'delete_message_id':res['id_message'],
      
        'tu_users_id':res['tu_users_id'],
      
              }))
      
        setTimeout(function(){ chatSocket_actions.close()  }, 1000);
        
      }




})
}

 function add_user_in_table(id,role){
  $.ajax({
    method: "POST",
    url: "/chat_/serch_user/",
    dataType: 'json',
    data:{'add_users_in_users_table':'yes','id_add_user':id,'role':role},
    cache : false,
    }).done(function(res){
      console.log(res)
      if ('ok' in res){
      let users_add=res['new_users'][0]
      let  new_users=`
      <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0" id=user_${users_add['id']} onclick="serch_mesage('${users_add['id']}','${users_add['role']}')" >
      <div class="media"><img src="/static/media/photo_teacher/${users_add['pictures_teacher']}" alt="user" width="50" class="rounded-circle" style="height: 50px;">
        <div class="media-body ml-4">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <h6 class="mb-0"> ${users_add['first_name']} ${users_add['last_name']}</h6><small class="small font-weight-bold"> </small>
          </div>
       
                   
                     <p class="font-italic text-muted mb-0 text-small" id='text_mesage${users_add['id']}' ><b> </b> </p>
        
           
    
        </div>
      </div>
    </a>
      `
      $("#users_table").prepend(new_users)
      $("#user_"+users_add['id']).click()
      }
      else{
        $("#user_"+res['id_user']).click()

      }

    })
}
function myFunction() {
  console.log('mtaaaaaaaa')
  setTimeout(function(){   document.getElementById("myDropdown").classList.toggle("show");  }, 400);



 }

function serch_user(){
  serch_text=$("#search-focus").val()
  console.log(serch_text)
  $.ajax({
    method: "POST",
    url: "/chat_/serch_user/",
    dataType: 'json',
    data:{'serch_user':serch_text},
    cache : false,
    }).done(function(res){
  console.log(res)
  var serch_result=res['serch_result']
  console.log(serch_result)
  let all_result_div=''
  for (let i=0;i<serch_result.length;i++){
    console.log(serch_result[i])
    let div_serch_user=`
  <a href='#' onclick="add_user_in_table(${serch_result[i]['id']},'${serch_result[i]['role']}');return false;">
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img src="/media/photo_teacher/${serch_result[i]['pictures_teacher']}" class="rounded-circle user_img">
        <span class="online_icon offline"></span>
      </div>
      <div class="user_info">
        <span>${serch_result[i]['last_name']} ${serch_result[i]['first_name']}</span>
      
      </div>
    </div>
  </a>
   
    `

    all_result_div+=div_serch_user
  }

  $("#myDropdown").html(all_result_div)
  let arr=[1,5,6,7,2,0,3]  
})
}








