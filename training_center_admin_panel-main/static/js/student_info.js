let x = document.querySelectorAll(".toggle-line")
let y = document.querySelectorAll(".dropdown")
let z = document.querySelectorAll(".arrow")
function payment(){
    let payment_student_all = $("#payment_student_all").val()
let payment_studnet=0
payment_student_all=payment_student_all.split(' ')

for (let i=0 ;i<payment_student_all.length;i++){
    console.log(payment_student_all[i])
    payment_studnet+=Number(payment_student_all[i])
}

$("#payment_number").html(payment_studnet + " AMD")

}
payment()


for(let i = 0;x.length;i++){
    x[i].onclick = ()=>{
        y[i].classList.toggle("dropdown-dropped")
        z[i].classList.toggle("arrow-rotate")
    }
}

function tuday(){
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;
$("#date_input").val(today)
console.log(today)
}
function file_input_click(){
    $('#file_payment').click()
   
}

function updateValue(){
    $("#name_file").html("<br>"+$('#file_payment')[0].files[0].name)
    
}

function file_input_click1(id){
    $('#file_payment'+id).click()
   
}
function updateValue1(id){
    console.log('asdasdasd')
    $("#name_file_"+id).html($('#file_payment'+id)[0].files[0].name)
    
}

function add_payment(id){
    let data=$('#date_input').val();
    let point=$('#paid_input').val();
    let comment=$('#comment_input').val();
    var f_obj = $("#file_payment").get(0).files[0];
    // let send_mail=$('#send_mail').val();
    let send_mail=false
    if ($('#send_mail').is(":checked"))
{
    send_mail=true
  
}
    let formData = new FormData();
    formData.append('file', f_obj);
    formData.append('data', data);
    formData.append('point', point);
    formData.append('comment', comment);
    formData.append('send_mail', send_mail);
    formData.append('id',id);
  
            $.ajax({
            method: "POST",
            url: "/students/"+id+"/",
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data:formData,
            cache : false,
            }).done(function(res){
                if ('add_row' in res){
                    if (send_mail){
                        sending_info=`
                    
                        <i class="fas fa-paper-plane" style="color: green;"> </i>
                        <p style="text-align: center;">  Sent</p>
    
                `
                    }
                    else{
                        sending_info=`
                        <i class="fas fa-paper-plane" style="color: red;">   </i>
                        <p style="text-align: center;">  Not Sent</p>
                        `
                    }
                    console.log('done')
                    let add_row=`<tr id=id_row${res['id_payment']}>

                  

                  
                    <td><p id='data_${res['id_payment']}' style="display: block;"> ${data}</p><input class="comment_" id='input_data${res['id_payment']}' type="text" value='${data}'  style="display: none;"></td>
                    <td><p id='point_${res['id_payment']}'  style="display: block;">${point} AMD</p><input class="comment_" id='input_point_${res['id_payment']}' type="text" value="${point}" style="display: none;"> </td>
                    <td>
                        <a href="" onclick="file_input_click1('${res['id_payment']}'); return false;"  style="display: none;" id='file_update_${res['id_payment']}'><i class="fas fa-upload" id="name_file${res['id_payment']}"><br></i></a>
                        <input type="file" style="display: none;" id='file_payment${res['id_payment']}' onchange="updateValue1('${res['id_payment']}')">

                        <a href="../../static/media/${res['file_name']}"  style="display: block;"  id='file_${res['id_payment']}'>${res['file_name']}</a>
                        <p id="name_file_${res['id_payment']}" style="display: none;text-align: center;"></p>

                    </td>
                    <td>
                        <p style="width: 400px;word-break: break-all;display: block;" id='comment_${res['id_payment']}'>${comment}</p><input class="comment_" id='input_comment_${res['id_payment']}' type="text" value="${comment}"  style="display: none;">
                    </td>
                    <td>
                    `+sending_info+`
                </td>
                    <td>
                        <div class="btn">
                          
                            <button class="btn_edit"  onclick="edit('${res['id_payment']}');return false;" id='edit_button_${res['id_payment']}'  style="display: block;">
                                <i class="far fa-edit"></i>
                                
                            </button>
                     
                            <button class="btn_delet" id='delete_button_${res['id_payment']}' onclick="delete_row('${res['id_payment']}','${id}')" style="display: block;">
                                <i class="fas fa-trash-alt"></i>
                            </button>

                            <button class="btn_add" onclick="edit_save('${res['id_payment']}','${id}')" id='edit_button_save${res['id_payment']}' style="display: none;background-color: #2284CB;"> <i class="far fa-edit">    Edit</i></button>
                        </div>
                    </td>
               
    
                </tr>
                `
                $("#tbody_show").append(add_row)
                $("#payment_number").html(res['payment_all'] + " AMD")
                 data=$('#date_input').val('')
                 point=$('#paid_input').val('')
                 comment=$('#comment_input').val('')
                 f_obj = $("#file_payment").val('')
                 $("#name_file").html('')

                }
              

            })


        }
function edit(id){
    $('#data_'+id).css('display','none')
    $('#input_data'+id).css('display','block')
    $('#point_'+id).css('display','none')
    $('#input_point_'+id).css('display','block')
    $('#comment_'+id).css('display','none')
    $('#input_comment_'+id).css('display','block')
    $('#file_update_'+id).css('display','block')
    $('#file_'+id).css('display','none')
    $('#name_file_'+id).css('display','block')
    $('#edit_button_'+id).css('display','none')
    $('#delete_button_'+id).css('display','none')
    $('#edit_button_save'+id).css('display','block')
}
function edit_save(id,student_id){

    let data=  $('#input_data'+id).val()
    let point=  $('#input_point_'+id).val()
    let comment=$('#input_comment_'+id).val()
    var f_obj = $("#file_payment"+id).get(0).files[0];
    let formData = new FormData();
    formData.append('file', f_obj);
    formData.append('data', data);
    formData.append('point', point);
    formData.append('comment', comment);
    formData.append('id',id);
    formData.append('student_id',student_id);
    formData.append('medthod','edit');
  
            $.ajax({
            method: "POST",
            url: "/students/"+student_id+"/",
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data:formData,
            cache : false,
            }).done(function(res){
                if ('edit_row' in res){
                    console.log(res['edit_row'][0].file_payment)
                    if (res['edit_row'][0].send_mail){
                        sending_info=`
                    
                        <i class="fas fa-paper-plane" style="color: green;"> </i>
                        <p style="text-align: center;">  Sent</p>
    
                `
                    }
                    else{
                        sending_info=`
                        <i class="fas fa-paper-plane" style="color: red;">   </i>
                        <p style="text-align: center;">  Not Sent</p>
                        `
                    }
                    

                    
                    let add_row=`
                    

                  
                    <td><p id='data_${id}' style="display: block;"> ${data}</p><input class="comment_" id='input_data${id}' type="text" value='${data}'  style="display: none;"></td>
                    <td><p id='point_${id}'  style="display: block;">${point} AMD</p><input class="comment_" id='input_point_${id}' type="text" value="${point}" style="display: none;"> </td>
                    <td>
                        <a href="" onclick="file_input_click1('${id}'); return false;"  style="display: none;" id='file_update_${id}'><i class="fas fa-upload" id="name_file${id}"><br></i></a>
                        <input type="file" style="display: none;" id='file_payment${id}' onchange="updateValue1('${id}')">

                        <a href="../../static/media/${res['edit_row'][0].file_payment}"  style="display: block;"  id='file_${id}'>${res['edit_row'][0].file_payment}</a>
                        <p id="name_file_${id}" style="display: none;text-align: center;"></p>

                    </td>
                    <td>
                        <p style="width: 400px;word-break: break-all;display: block;" id='comment_${id}'>${comment}</p><input class="comment_" id='input_comment_${id}' type="text" value="${comment}"  style="display: none;">
                    </td>
                    <td>
                    `+sending_info+`
                </td>

                    <td>
                        <div class="btn">
                          
                            <button class="btn_edit"  onclick="edit('${id}');return false;" id='edit_button_${id}'  style="display: block;">
                                <i class="far fa-edit"></i>
                                
                            </button>
                     
                            <button class="btn_delet" id='delete_button_${id}' onclick="delete_row('${id}','${student_id}') style="display: block;">
                                <i class="fas fa-trash-alt"></i>
                            </button>

                            <button class="btn_add" onclick="edit_save('${id}','${student_id}')" id='edit_button_save${id}' style="display: none;background-color: #2284CB;"> <i class="far fa-edit">    Edit</i></button>
                        </div>
                    </td>
                `
                $('#id_row'+id).html(add_row)
          
                $("#payment_number").html(res['payment_all'] + " AMD")


               }
              

            })
}

function delete_row(id,student_id){
    $.ajax({
        method: "POST",
        url: "/students/"+student_id+"/",
        dataType: 'json',
        data:{'id':id,'delete':'ok'},
        }).done(function(res){
            $('#id_row'+id).remove()
            $("#payment_number").html(res['payment_all'] + " AMD")

        })
}
function create_calendar(id_grup,method,year){
    $.ajax({
        method: "POST",
        url: "/students_calendar/"+id_grup+"/",
        dataType: 'json',
        data:{"method":method,"year":year,'done_lesons_update':"edit"},
        cache : false,
        }).then(function(res) {
             let start_true=false
             let id=0;
      

             for (var i in res[1]) {
                  var k=0;
                  let calendar_=$('#month_'+id);
                  let name_month = i.split(' ')[0];
                  let yaer = i.split(" ")[1]
                  calendar_.html(`   <div class="weekdays">${res['lang_month']["weekdays"]['Mo']}</div>
                                    <div class="weekdays">${res['lang_month']["weekdays"]["Tu"]}</div>
                                    <div class="weekdays">${res['lang_month']["weekdays"]["We"]}</div> 
                                    <div class="weekdays">${res['lang_month']["weekdays"]["Th"]}</div>
                                    <div class="weekdays">${res['lang_month']["weekdays"]["Fr"]}</div> 
                                    <div class="weekdays">${res['lang_month']["weekdays"]["Sa"]}</div>
                                    <div class="weekdays">${res['lang_month']["weekdays"]["Su"]}</div>`);

                  let calendar_title=$('#year_title'+id)
                  let year_title=`<p id=year__${id} data-info_yaer="${i}">${res['lang_month']['month'][name_month]}      ${yaer}</p`
                  calendar_title.html(year_title);
                  id+=1;
                 
          
                 for (let j = 0; j < res[1][i].length; j++){
                      
                       if (res[1][i][j]==0){
                            if (res[2][i]) {
                                 let group_days_start=res[1][i].length - res[2][i].length;
                                 if(group_days_start==j){start_true=true};
                                 if (res[2][i][0]==0){
                                      k+=1
                                 }
                                 console.log(k,'kanem')
                                 }
                            
                       var digits=`<div class = "one" ></div>`
                      
                       calendar_.append(digits);
                            
                       } else {
                            let digits = '';
                            digits=`<div class = "one" >${res[1][i][j]}</div>`
                         
                            if (res[2][i]) {
                                 let group_days_start=res[1][i].length - res[2][i].length;
                                 start_true=true
                               
                                 if(group_days_start==j){start_true=true};
                                 if(start_true){
                             

                                      if (res[2][i][k]) {
                                           console.log(res[1][i][j],res[2][i][k])
                                          
                             
                                           if (res[1][i][j] === res[2][i][k]) {
                                                k+=1
                                                digits = `<div class = "one one-backcolor"  data-name='${i} ${res[1][i][j]}' data-id_group='${id_grup}' >${res[1][i][j]}</div>`
                                           }
                                      }
                                 }
                                 } 
                                 console.log(digits)   
                            calendar_.append(digits);
                            }       
                       }
                  var start=true;
                  }for (i in res[3]){
                      
                       let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                       let data_wikdays=vikdays_start.text()
                       if (data_wikdays==1){
                            let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                            vikdays_start.addClass('one-left');
                       }

                       if(start){
                            let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                            vikdays_start.addClass('one-left');
                            start=false
                       }
                       if (res[3][i]=="monday"){
                            let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                            vikdays_start.addClass('one-left');
                       }
                       if (res[3][i]=="sunday"){
                            let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                            vikdays_start.addClass('one-right');
                       }
                  }
                  for (i in res[4]){
                       let vikdays_start=$(document).find('.calend').find('div[data-name="'+i+'"]');
                       vikdays_start.addClass('one-right');
                  }
        }).then(function() {
            $.ajax({
                 method: "GET",
                 url: "/students/"+id_grup+"/",
                 dataType: 'json',
                 data:{"method":method,"year":year,'studnents_calendar_lesons':'ok'},
                 cache : false,
                 }).then(function(res) {
                      console.log(res)
                 

                      for (var i in res['lesons']){
                           let lesons_date=$(document).find('.calend').find('div[data-name="'+res['lesons'][i].data_leson+'"]')
                           
                           if (res['lesons'][i].status=="Done"){
                                let done_lesons=`<div class="check-circle">✓</div>`
                                lesons_date.append(done_lesons)
                           }
                           if (res['lesons'][i].status=="In progress"){
                                let done_lesons=`<i class="fa fa-clock-o" aria-hidden="true"></i>`
                                lesons_date.append(done_lesons)
                           }
                           
                           
                           if (res['lesons'][i].lesons_name){
                                let hover_efect=`<div class="hover-effect">${res['lesons'][i].lesons_name.substring(0,11)}...</div>`
                                lesons_date.append(hover_efect);
                                lesons_date.addClass('newClass');
                           }
                           else{
                                let hover_efect=`<div class="hover-effect">${res['lesons'][i].lesons_name.substring(0,10)}</div>`
                                lesons_date.append(hover_efect);
                                lesons_date.addClass('newClass');

                           }



                           lesons_date.append('<style>.newClass::before{content:" ";\n' +
                               '\tbackground-color: rgba(75,146,58,0.4);\n' +
                               '\twidth:30px;\n' +
                               '\theight: 30px;\n' +
                               '\tposition: absolute;\n' +
                               '\tborder-radius: 100%;\n' +
                               '\tz-index: 0;}</style>');
                           lesons_date.data('start-time',res['lesons'][i].leson_time_start);
                           lesons_date.data('end-time',res['lesons'][i].leson_time_end);

                           lesons_date.bind("contextmenu", function(e) {
                                let data_lesons_clic=e.currentTarget.attributes[5].nodeValue
                                
                                data=` <div class="dropdown" id='menu_delete'>
                                <div class="dropdown-content">
                                <a href=# onclick="delete_leosnons('${data_lesons_clic}'); return false;">Delete</a>
                                <a href=# onclick="add_comment('${data_lesons_clic}'); return false;">Add Comment</a>
                                
                                </div>
                              </div>`
                                console.log(e.currentTarget.attributes[5].nodeValue)
                                console.log($(this))
                                $(this).append(data)
                                return false;
                            });

                           lesons_date.on('click', function() {
                                console.log($(this))
                                $('#menu_delete').remove()
                                $("#add_new_lesons_time_comment").html('')
                                let reset=` <p class = "text-contract-second">Lesson Start date</p>
                                <div class = "contract-date-start" id="lesons_start_time"></div>
                                <div class = "at">-</div>
                                <div class = "contract-date-start" id="lesons_end_time"></div>
                                `          
                                $("#add_new_lesons_time").html(reset)
                             
                                let start_lesons=$('#lesons_start_time')
                                let end_lesons=$('#lesons_end_time')
                                let time_strat_lesons=`${$(this).data('start-time')}`
                                let time_end_lesons=`${$(this).data('end-time')}`
                                start_lesons.html(time_strat_lesons)
                                end_lesons.html(time_end_lesons)

                                
                           
                           });


                      
                      };



             
                  
                 
       });
       

  });



}
function get_month_and_year(next_and_last,id){
    year = $( "#year__0" ).attr("data-info_yaer")
   
    create_calendar(id,next_and_last,year) 
}