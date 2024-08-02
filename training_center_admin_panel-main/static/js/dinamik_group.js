function tablica_lesons(id_group,method,page){
     $.ajax({
          method: "POST",
          url: "/groups_lesons_data/"+id_group+"/",
          dataType: 'json',
          data:{'method':'non',"method_tabilca":"create",'start_page':page,'method_page':method},
          cache : false,
          }).done (function(res) {
               // console.log(res)
               var div_body=$('#body_table')
               div_body.html('')
               var start_1=0
               let div_page_next_last=$('.last_next_button');
               // console.log(div_page_next_last,'asdasdasdasdasdasdasdads')
               if (res['page']==1){
                    var buutton=`
                    <a href='' class="next round" id='next_15'  onclick="tablica_lesons(${id_group},'next',${res['page']});return false;" =>&#8250;</a>|`
                    
               }
               else if(res['lesons'].length<11){
                    var buutton=`<a href="" class="previous round" id='last_15' onclick="tablica_lesons(${id_group},'last',${res['page']});return false;" >&#8249;</a>|` 
               }
               else{
                    var buutton=`
                    <a href='' class="next round" id='next_15'  onclick="tablica_lesons(${id_group},'next',${res['page']});return false;" =>&#8250;</a>|
                    <a href="" class="previous round" id='last_15' onclick="tablica_lesons(${id_group},'last',${res['page']});return false;" >&#8249;</a> 
                    
                  
                    `
               }
               div_page_next_last.html(buutton);
               console.log(res['lesons'])

               for (var i in res['lesons']){
                    var data = res['lesons'][i].data_leson_number;
                    data=data.split('.')
                    if (res['lesons'][i].status=="Done" ){
                         let body_tags=`
                         <div class = "line" >
                         <div class = "content-body">
                                   <div class="done">
                                        <div class="done-block">
                                                     ${res['lesons'][i].status}
                                                  </div>
                                             </div>
                                             <div class="date-text">${data[2]}.${data[1]}.${data[0]}</div>
                                             <div class="subject-text">
                                                   <select class="all_component${start_1} "data-id_tables='${start_1}' >
                                                       <option>${res['lesons'][i].leson_component_name}</option>
                                                   </select>
                                             </div>
                                             <div class="lessons-text">
                                                 
                                                 <select class='all_lesons${start_1}' data-id_tables='${start_1}'>
                                                      <option>${res['lesons'][i].lesons_name}</option>
                                                 </select>
                                             </div>
                                         </div>
                                         </div>
                         `
                         div_body.append(body_tags)

                    }
                    else if(res['lesons'][i].status=="In progress" ){

                         let body_tags=`<div class = "line">
                                    <div class = "content-body">
                                        <div class="progress">
                                            <div class="progress-block">
                                            ${res['lesons'][i].status}
                                            </div>
                                        </div>
                                        <div class="date-text">${data[2]}.${data[1]}.${data[0]}</div>
                                        <div class="subject-text">
                                              <select class="all_component${start_1}" data-id_tables='${start_1}'>
                                                    <option>${res['lesons'][i].leson_component_name}</option>
                                               </select>
                                        </div>
                                        <div class="lessons-text">
                                             <select class='all_lesons${start_1}' data-id_tables='${start_1}'>
                                                  <option>${res['lesons'][i].lesons_name}</option>
                                              </select>
                                        </div>
                                    </div>
                                </div> `
                                div_body.append(body_tags)         
                   }
                   else if(res['lesons'][i].status=="Coming" ){
                    let body_tags=`<div class = "line another">
                    <div class = "content-body">
                        <div class="coming">
                            <div class="coming-block">
                            ${res['lesons'][i].status}
                            </div>
                        </div>
                        <div class="date-text">${data[2]}.${data[1]}.${data[0]}</div>
                        <div class="subject-text">
                                   <select class="all_component${start_1}"  data-id_tables='${start_1}' >
                                        <option>${res['lesons'][i].leson_component_name}</option>
                                    </select>
                        </div>
                        <div class="lessons-text">
                            <select class='all_lesons${start_1}' data-id_tables='${start_1}'>
                            <option>${res['lesons'][i].lesons_name}</option>
                            </select>
                         </div>
                         </div>
                         </div>`
                    
                    div_body.append(body_tags)

                   }
                   let component_id_select=0
                
                   for (var j in res['component']){
                    if (res['lesons'][i].leson_component_name!=res['component'][j].component_name){
                         let option=$('.all_component'+start_1)
                         let option_append=`<option>${res['component'][j].component_name}</option>`
                         option.append(option_append)

                    }
                    else{
                      
                         component_id_select=res['component'][j].id

                    } 

               }
              
               for(var k in res['lesons_select']){
          
               
                    if (component_id_select==res['lesons_select'][k].language_id && res['lesons'][i].id_lesons!=res['lesons_select'][k].id){
                         console.log('mtaaaaaaaaaaaaaaaaaaaaa')
                         let lesons=$('.all_lesons'+start_1)
                         let lesons_option=`<option>${res['lesons_select'][k].name}</option>`
                          lesons.append(lesons_option)
                    }
                    else{
                         continue
                    }

               }

               $('.all_component'+start_1).change(function() {
                    let parent_component=$(this).val();
                    var id_table=$(this).data('id_tables')
                    // console.log(id_table)
                    var seletc=$(this).closest( ".content-body" ).find('.lessons-text select')
                    var data_lesons_select=$(this).closest( ".content-body" ).find('.date-text').text()
                    seletc.html('')
                    $.ajax({
                         method: "POST",
                         url: "/grupCalendar/"+id_group+"/",
                         dataType: 'json',
                         data:{'select':'yes','name_component':parent_component,'data_lesons':data_lesons_select,'page':res['page']},
                         cache : false,
                         }).done (function(res){
                              
                              for (let i in res['lesons']){
                               
                                   let option=`<option>${res['lesons'][i].name}</option>`
                                   seletc.append(option);
                              }
                              if(res['next']){
                                   $.ajax({
                                        method: "POST",
                                        url: "/grupCalendar/"+id_group+"/",
                                        dataType: 'json',
                                        data:{'add10':'add','id_lesons_start':res['next'][0],'data_leson_number':res['next'][1],'page':page,'component':parent_component},
                                        cache : false,
                                        }).done (function(res){
                                            
                                             // console.log($('.all_component2'))
                                             var start=id_table+1
                                             for (let j = 0;  j<11 ; j++){
                                                  // console.log(j)
                                                  let component_add=$('.all_component'+start)
                                                  let lesons_add=$('.all_lesons'+start)
                                                  component_add.html('')
                                                  lesons_add.html('')
                                                  // console.log(component_add)
                                                  if ( j < res['component'].length){
                                                  let add_newcomponent=`<option>${res['component'][j]}</option>`
                                                  let add_nev_lesons=`<option>${res['lesons_name'][j]}</option>`
                                                  component_add.append(add_newcomponent)
                                                  lesons_add.append(add_nev_lesons)
                                                  let component_id_lesons=0
                                                  for (let k in res['component_all']){
                                                       if(res['component_all'][k].component_name!=res['component'][j]){
                                                            let add_newcomponent=`<option>${res['component_all'][k].component_name}</option>`
                                                            component_add.append(add_newcomponent)
          

                                                       }
                                                       else{
                                                            component_id_lesons=res['component_all'][k].id

                                                       }

                                                  }
                                                  for (let i in res['all_lesons']){
                                                       if(component_id_lesons==res['all_lesons'][i].language_id && res['lesons_id'][j]!=res['all_lesons'][i].id){

                                                            let add_nev_lesons=`<option>${res['all_lesons'][i].name}</option>`
                                                            lesons_add.append(add_nev_lesons)
                                                       }

                                                  }
                                                            
                                                  }
                                                  else{
                                                       let add_newcomponent=`<option></option>`
                                                       let add_nev_lesons=`<option></option>`
                                                       component_add.append(add_newcomponent)
                                                       lesons_add.append(add_nev_lesons)
                                                       for (let k in res['component_all']){
                                                                 let add_newcomponent=`<option>${res['component_all'][k].component_name}</option>`
                                                                 component_add.append(add_newcomponent)
                                                                 for (let i in res['all_lesons']){
                                                                      if(res['component_all'][k].id!=res['all_lesons'][i].language_id && res['lesons_id'][j]!=res['all_lesons'][i].id){
                                                                           let add_nev_lesons=`<option>${res['all_lesons'][i].name}</option>`
                                                                           lesons_add.append(add_nev_lesons)
                                                                      }
     
                                                                 }
     
                                                            }
                                                  }
                                                  start+=1
                                             }
                                        });  
                              }
                              if(res['next']){
                                   $.ajax({
                                        method: "POST",
                                        url: "/grupCalendar/"+id_group+"/",
                                        dataType: 'json',
                                        data:{'add':'add','id_lesons_start':res['next'][0],'data_leson_number':res['next'][1],'page':page,'component':parent_component},
                                        cache : false,
                                        }).done (function(res){
                                        });               
                              }
                         });
                    });






                    $('.all_lesons'+start_1).change(function() {
                         let this_leosn_select=$(this).val();
                         let parent_component=$(this).closest(".content-body").find('.subject-text select').val();
                         var id_table=$(this).data('id_tables')
                
                         var seletc=$(this).closest( ".content-body" ).find('.lessons-text select')
                         var data_lesons_select=$(this).closest( ".content-body" ).find('.date-text').text()
                        
                         $.ajax({
                              method: "POST",
                              url: "/grupCalendar/"+id_group+"/",
                              dataType: 'json',
                              data:{'select':'yes','select_lesons':'yes','name_lesons':this_leosn_select,'data_lesons':data_lesons_select,'name_component':parent_component,'page':res['page']},
                              cache : false,
                              }).done (function(res){
                                   if(res['next']){
                                   $.ajax({
                                        method: "POST",
                                        url: "/grupCalendar/"+id_group+"/",
                                        dataType: 'json',
                                        data:{'add10':'add','id_lesons_start':res['id_lesons'],'data_leson_number':res['data_lesons'],'page':res['page'],'component':parent_component},
                                        cache : false,
                                        }).done (function(res){
                                            
                                             // console.log($('.all_component2'))
                                             var start=id_table+1
                                             for (let j = 0;  j<11 ; j++){
                                                  console.log(j)
                                                  let component_add=$('.all_component'+start)
                                                  let lesons_add=$('.all_lesons'+start)
                                                  component_add.html('')
                                                  lesons_add.html('')
                                                  // console.log(component_add)
                                                  if ( j < res['component'].length){
                                                  let add_newcomponent=`<option>${res['component'][j]}</option>`
                                                  let add_nev_lesons=`<option>${res['lesons_name'][j]}</option>`
                                                  component_add.append(add_newcomponent)
                                                  lesons_add.append(add_nev_lesons)
                                                  let component_id_lesons=0
                                                  for (let k in res['component_all']){
                                                       if(res['component_all'][k].component_name!=res['component'][j]){
                                                            let add_newcomponent=`<option>${res['component_all'][k].component_name}</option>`
                                                            // component_add.append(add_newcomponent)

                                                       }
                                                       else{
                                                            component_id_lesons=res['component_all'][k].id

                                                       }

                                                  }
                                                  for (let i in res['all_lesons']){
                                                       if(component_id_lesons==res['all_lesons'][i].language_id && res['lesons_id'][j]!=res['all_lesons'][i].id){

                                                            let add_nev_lesons=`<option>${res['all_lesons'][i].name}</option>`
                                                            lesons_add.append(add_nev_lesons)
                                                       }
                                                  }
                                                  
                                                            
                                                  }
                                                  else{
                                                       let add_newcomponent=`<option></option>`
                                                       let add_nev_lesons=`<option></option>`
                                                       component_add.append(add_newcomponent)
                                                       lesons_add.append(add_nev_lesons)
                                                       for (let k in res['component_all']){
                                                                 let add_newcomponent=`<option>${res['component_all'][k].component_name}</option>`
                                                                 component_add.append(add_newcomponent)
                                                                 for (let i in res['all_lesons']){
                                                                      if(res['component_all'][k].id!=res['all_lesons'][i].language_id && res['lesons_id'][j]!=res['all_lesons'][i].id){
                                                                           let add_nev_lesons=`<option>${res['all_lesons'][i].name}</option>`
                                                                           lesons_add.append(add_nev_lesons)
                                                                      }
     
                                                                 }
     
                                                            }
                                                  }
                                                  start+=1
                                             }
                                        }); 
                                   }
                                   if(res['next']){
                                        $.ajax({
                                             method: "POST",
                                             url: "/grupCalendar/"+id_group+"/",
                                             dataType: 'json',
                                             data:{'add':'add','id_lesons_start':res['id_lesons'],'data_leson_number':res['data_lesons'],'page':res['page'],'component':parent_component},
                                             cache : false,
                                             }).done(function(res){});
                                        }



                              });


                         
         

                         
                    });






               
                    start_1+=1

               }
            
           
              
});
}


$( "#input_start" ).change(function() {
   
     let start_time=$(".input_start").val();
     let end_times=$(".input_end").val();
   
     if (start_time.length>0 && end_times.length>0 ){

     }
     

});
$( ".target" ).change(function() {
     alert( "Handler for .change() called." );
   });


function create_calendar(id_grup,method,year){
     $.ajax({
          method: "POST",
          url: "/grupCalendar/"+id_grup+"/",
          dataType: 'json',
          data:{"method":method,"year":year,'done_lesons_update':"edit"},
          cache : false,
          }).then(function(res) {
               let start_true=false
               let id=0;
        

               for (var i in res[1]) {
                    var k=0;
                    let name_month = i.split(' ')[0];
                    let yaer = i.split(" ")[1]
                    let calendar_=$('#month_'+id);
                    calendar_.html(`    <div class="weekdays">${res['lang_month']["weekdays"]['Mo']}</div>
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
                                   // console.log(k,'kanem')
                                   }
                              
                         var digits=`<div class = "one" ></div>`
                        
                         calendar_.append(digits);
                              
                         } else {
                              let digits = '';
                              digits=`<div class = "one" >${res[1][i][j]}</div>`
                              // console.log(res[1][i],'esiiiiiiiiiiiii',res[2][i])
                           
                              if (res[2][i]) {
                                   let group_days_start=res[1][i].length - res[2][i].length;

                                   start_true=true
                                   if(group_days_start==j){start_true=true};
                                   if(start_true){
                               
                                        // console.log(res[1][i][j],res[2][i][k],res[2][i],11111111)
                                        if (res[2][i][k]) {
                                             // console.log(res[1][i][j],res[2][i][k],22222222222222)
                                            
                                         
                                             if (res[1][i][j] === res[2][i][k]) {
                                                  k+=1
                                                  digits = `<div class = "one one-backcolor"  ondrop="drop(event)" ondragover="allowDrop(event)" ondragstart="dragStart(event)" draggable="true" data-name='${i} ${res[1][i][j]}' data-id_group='${id_grup}' ondblclick="myFunction('${i} ${res[1][i][j]}','${id_grup}')">${res[1][i][j]}</div>`
                                             }
                                        }
                                   }
                                   } 
                                   // console.log(digits)   
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
                    method: "POST",
                    url: "/groups_lesons_data/"+id_grup+"/",
                    dataType: 'json',
                    data:{"method":method,"year":year},
                    cache : false,
                    }).then(function(res) {
                         // console.log(res)
                    

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
                                   // console.log(e.currentTarget.attributes[5].nodeValue)
                                   // console.log($(this))
                                   $(this).append(data)
                                   return false;
                               });

                              lesons_date.on('click', function() {
                                   // console.log($(this))
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

};

function get_month_and_year(next_and_last,id){
     year = $( "#year__0" ).attr("data-info_yaer")
     create_calendar(id,next_and_last,year) 
}

$( ".input_end" ).change(function() {
     

});
function addEvants() {
     $(document).find('.calend').find('div[data-name="Febary 2021 16"]').css({background: 'red'});
     
}
function dragStart(event) {
     event.dataTransfer.setData("Text", event.target.getAttribute('data-name'))     
   }

function allowDrop(event) {
     event.preventDefault();

     }
function drop(event) {
     event.preventDefault();
     var last_data = event.dataTransfer.getData("Text");
     var this_data=event.target.getAttribute('data-name')
     var this_id_group=event.target.getAttribute('data-id_group')
     $.ajax({
          method: "POST",
          url: "/groups_lesons_data/"+this_id_group+"/",
          dataType: 'json',
          data:{"method":"update lesons in calendar","last":last_data,'this':this_data},
          cache : false,
          }).done (function(res) {
               let reset=` <p class = "text-contract-second">Lesson Start date</p>
               <div class = "contract-date-start" id="lesons_start_time"></div>
               <div class = "at">-</div>
               <div class = "contract-date-start" id="lesons_end_time"></div>
               `          
               $("#add_new_lesons_time").html(reset)
               if (res['lesons']){
                    console.log(res['last_data'])
                    $(document).find('.calend').find('div[data-name="'+last_data+'"]').removeClass('newClass')
                    $(document).find('.calend').find('div[data-name="'+last_data+'"]').html(res['last_data'])
                    $(document).find('.calend').find('div[data-name="'+this_data+'"]').addClass('newClass')
                    // create_calendar(res["id"],res['method'],res['year']);
                    let new_lesons=$(document).find('.calend').find('div[data-name="'+this_data+'"]')
                    
                    if (res['lesons'][0]=="Done"){
                         let done_lesons=`<div class="check-circle">✓</div>`
                         new_lesons.append(done_lesons)
                    }
                    if (res['lesons'][0]=="In progress"){
                         let done_lesons=`<i class="fa fa-clock-o" aria-hidden="true"></i>`
                         new_lesons.append(done_lesons)
                    }
                    
                    if (res['lesons'][1]){
                         let hover_efect=`<div class="hover-effect">${res['lesons'][1].substring(0,11)}...</div>`
                         new_lesons.append(hover_efect);
              
                    }
                    else{
                         let hover_efect=`<div class="hover-effect">${res['lesons'][1].substring(0,10)}</div>`
                         new_lesons.append(hover_efect);
                

                    }


                    new_lesons.append('<style>.newClass::before{content:" ";\n' +
                        '\tbackground-color: rgba(75,146,58,0.4);\n' +
                        '\twidth:30px;\n' +
                        '\theight: 30px;\n' +
                        '\tposition: absolute;\n' +
                        '\tborder-radius: 100%;\n' +
                        '\tz-index: -1;}</style>');
                        new_lesons.data('start-time',res['lesons'][2]);
                        new_lesons.data('end-time',res['lesons'][3]);
                    
                    
                        new_lesons.on('click', function() {
                         console.log($(this))
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
            

               }


          });
   }

$(document).ready(function(){

     $('.select_room').change(function(e) {
          var id_grop_select=$('#id_grups_select').val()
          let start=$('#'+$(e.currentTarget).attr('id')+"_start").val()
          let end=$('#'+$(e.currentTarget).attr('id')+"_end").val()
          

     $.ajax({
          method: "POST",
          url: "/rooms/",
          dataType: 'json',
          data:{"week_name":$(e.currentTarget).attr('id'),"group_id":id_grop_select,'room_id':$(e.currentTarget).find('option:selected').attr('data-id',),
          'start':start,'end':end
          },
          cache : false,
          }).done (function(res) {
               console.log(res)
               var text=''
               if (res['eroor_room_time']){

                    window.alert('Please choose another time.The room was reserved from '+res['eroor_room_time'][1]+'-'+res['eroor_room_time'][2]+' for  '+res['eroor_room_time'][0])
                    $('#'+res['eroor_room_time'][3]).val(' ')
                    $(e.currentTarget).val(' ')
                   
               }
               if (res['non']){
                    window.alert("Place...Write Lesons Time ")
                    $('#'+$(e.currentTarget).attr('id')+"_start").css('background','red')
                    $('#'+$(e.currentTarget).attr('id')+"_end").css('background','red')

               }
               if (res['error_syntax']){
                    for(let i=0;i<res['error_syntax'].length;i++){
                         $('#'+res['error_syntax'][i]).css('background','red')

                    }
                    
               };
               if (res['error_parent_non']){
                    for(let i=0;i<res['error_parent_non'].length;i++){
                         $('#'+res['error_parent_non'][i]).css('background','red')
                         $('#'+res['error_parent_non'][i]).focus()

                    }

               }
               if (res['error_sravnenie']){
                    for(let i=0;i<res['error_sravnenie'].length;i++){
                         console.log(res['error_sravnenie'][i])
                         for (let j in res['error_sravnenie'][i]){
                              $('#'+j+'_start').css('background','green')
                              $('#'+j+'_end').css('background','red')
                              if(res['error_sravnenie'][i][j][0]===res['error_sravnenie'][i][j][1]){
                                   window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'='+res['error_sravnenie'][i][j][1])

                              }
                              else {
                                   window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'>'+res['error_sravnenie'][i][j][1])


                              }

                              
                              
                              
                         }
                     

                    }

               }

              
               let alert=true
               var x=0
               if (res['eror_teacher_work']){

                    console.log(res['eror_teacher_work'])
                    for(let i in res['eror_teacher_work_time']){
                         if (alert){
                              console.log(res['eror_teacher_work_time'][i])
                              window.alert('Teacher Work Time '+res['eror_teacher_work_time'][i]['teacher'][2]+' Start='+res['eror_teacher_work_time'][i]['teacher'][0]+'   Finish time='+res['eror_teacher_work_time'][i]['teacher'][1])

                         }
                         $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).val('')
                         $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).css('background','red')
                         alert=false
                         if(x==2){
                              alert=true
                              x=0

                         }

                         x++


                    }
               }
               alert=true
               x=0
        
               if (res['eror_teacher_work']){
                    for(let i=0;i<res['eror_teacher_work'].length;i++){
                         $('#'+res['eror_teacher_work'][i]).val('')
                         if(alert){
                              window.alert('Teacher in not working on  '+res['week_name_eroor'][i])
                              alert=false

                         }
                         if(x==2){
                              alert=true
                              x=0
                             

                         }

                         x++
                         

                    }
               }

               if(res['ok']){
               

               } 
             
               
             
          });
     });
   
     })
function edit_shedule1(id){
    
     let monday_start=$('#monday_start').val()
     let monday_end=$('#monday_end').val()
     let tuesday_start=$('#tuesday_start').val()
     let tuesday_end=$('#tuesday_end').val()
     let wednesday_start=$('#wednesday_start').val()
     let wednesday_end=$('#wednesday_end').val()
     let thursday_start=$('#thursday_start').val()
     let thursday_end=$('#thursday_end').val()
     let friday_start=$('#friday_start').val()
     let friday_end=$('#friday_end').val()
     let saturday_start=$('#saturday_start').val()
     let saturday_end=$('#saturday_end').val()
     let sunday_start=$('#sunday_start').val()
     let sunday_end=$('#sunday_end').val()

     let animacia=$('#animacia')
     let animacai_create=`<div id="fountainTextG"><div id="fountainTextG_1" class="fountainTextG">U</div><div id="fountainTextG_2" class="fountainTextG">p</div><div id="fountainTextG_3" class="fountainTextG">d</div><div id="fountainTextG_4" class="fountainTextG">a</div><div id="fountainTextG_5" class="fountainTextG">t</div><div id="fountainTextG_6" class="fountainTextG">e</div><div id="fountainTextG_7" class="fountainTextG"> </div><div id="fountainTextG_8" class="fountainTextG">.</div><div id="fountainTextG_9" class="fountainTextG">.</div><div id="fountainTextG_10" class="fountainTextG">.</div></div>`
     animacia.html(animacai_create)
     $.ajax({
          method: "POST",
          url: "/update_shedule/"+id+"/",
          dataType: 'json',
          data:{'monday_start':monday_start,'monday_end':monday_end,'tuesday_start':tuesday_start,'tuesday_end':tuesday_end,'wednesday_start':wednesday_start,'wednesday_end':wednesday_end,'thursday_start':thursday_start,'thursday_end':thursday_end,'friday_start':friday_start,'friday_end':friday_end,'saturday_start':saturday_start,'saturday_end':saturday_end,'sunday_start':sunday_start,'sunday_end':sunday_end},
        
          }).done (function(res) {
               console.log(res)
               var text=''
               if (res['error_syntax']){
                    for(let i=0;i<res['error_syntax'].length;i++){
                         $('#'+res['error_syntax'][i]).css('background','red')

                    }
                    
               };
               if (res['error_parent_non']){
                    for(let i=0;i<res['error_parent_non'].length;i++){
                         $('#'+res['error_parent_non'][i]).css('background','red')
                         $('#'+res['error_parent_non'][i]).focus()

                    }

               }
               if (res['error_sravnenie']){
                    for(let i=0;i<res['error_sravnenie'].length;i++){
                         console.log(res['error_sravnenie'][i])
                         for (let j in res['error_sravnenie'][i]){
                              $('#'+j+'_start').css('background','green')
                              $('#'+j+'_end').css('background','red')
                              if(res['error_sravnenie'][i][j][0]===res['error_sravnenie'][i][j][1]){
                                   window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'='+res['error_sravnenie'][i][j][1])

                              }
                              else {
                                   window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'>'+res['error_sravnenie'][i][j][1])


                              }

                              
                              
                              
                         }
                     

                    }

               }

               animacia.html('')
               let alert=true
               var x=0
               if (res['eror_teacher_work']){

                    console.log(res['eror_teacher_work'])
                    for(let i in res['eror_teacher_work_time']){
                         if (alert){
                              console.log(res['eror_teacher_work_time'][i])
                              window.alert('Teacher Work Time '+res['eror_teacher_work_time'][i]['teacher'][2]+' Start='+res['eror_teacher_work_time'][i]['teacher'][0]+'   Finish time='+res['eror_teacher_work_time'][i]['teacher'][1])

                         }
                         $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).val('')
                         $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).css('background','red')
                         alert=false
                         if(x==2){
                              alert=true
                              x=0

                         }

                         x++


                    }
               }
               alert=true
               x=0
        
               if (res['eror_teacher_work']){
                    for(let i=0;i<res['eror_teacher_work'].length;i++){
                         $('#'+res['eror_teacher_work'][i]).val('')
                         if(alert){
                              window.alert('Teacher in not working on  '+res['week_name_eroor'][i])
                              alert=false

                         }
                         if(x==2){
                              alert=true
                              x=0
                             

                         }

                         x++
                         

                    }
               }

               if(res['ok']){
                    location.reload();

               } 
             
          });
     
}
function myFunction(data_calendar,gorp_id){
     $.ajax({
          method: "POST",
          url: "/grupCalendar/"+gorp_id+"/",
          dataType: 'json',
          data:{'data_lesons_calendar_dablclik':data_calendar}
          }).done (function(res){
               console.log(res['serch_data'])
               // let modal_div=$('#modal_dabl_clic')
               // let button_oben_modal=$("#button_dabl_clic_modal")
               // let modal=`
              
  
               //     `
               //     modal_div.html(modal)
               //     button_oben_modal.click()
               if (res['serch_data']){
                    var serch=res['serch_data']
                    $('#method_serch_create_edit').val(serch)

                    let input1=`
                    <div class="d-flex align-items-center w-80">
                    <p class = "text-contract-second">Lesson Start date</p>
                    <div class = "contract-date-start" id="lesons_start_time"><input class = "contract-date-start" id="lesons_start_time1" placeholder="--:--"></div>
                    <div class = "at">-</div>
                    <div class = "contract-date-start" id="lesons_end_time">   <input class = "contract-date-start" id="lesons_end_time1" placeholder="--:--"></div>      

                    <p class = "text-contract-room">Room</p>
                    <select class='select_romm_modal'  id="${res['week_name']}" name="${res['week_name']}">

                    <option value=""></option>
       
                    </select>
                </div>
                <div id='save_and_edit' style="display: contents;">

                </div>

                    `
                    $("#add_new_lesons_time").html(input1)
                    let select=$('[name='+res['week_name']+']')
                    console.log(select)
                    for(i in res['room']){
                         console.log(res['room'][i].name)
                         append_option=`                        
                         <option  value="${res['room'][i].name}" data-id="${res['room'][i].id}">${res['room'][i].name}</option>
                     
                         `
                         select.append(append_option)
                         
                         
                         
                    }

               }
               else  {
                    console.log(res['lesons'])

                    let input1=`
                    <div class="d-flex align-items-center w-80">
                    <p class = "text-contract-second">Lesson Start date</p>
                    <div class = "contract-date-start" id="lesons_start_time"><input class = "contract-date-start" id="lesons_start_time1" value='${res['lesons'][0]['leson_time_start']}'></div>
                    <div class = "at">-</div>
                    <div class = "contract-date-start" id="lesons_end_time">   <input class = "contract-date-start" id="lesons_end_time1" value='${res['lesons'][0]['leson_time_end']}'></div>      

                    <p class = "text-contract-room">Room</p>
                    <select class='select_romm_modal'  id="${res['week_name']}" name="${res['week_name']}">

                   
       
                    </select>
                </div>
                <div id='save_and_edit' style="display: contents;">

                </div>


                    `
                    $("#add_new_lesons_time").html(input1)
                    let select=$('[name='+res['week_name']+']')
                    let this_option=`
                    <option value="${res['room'][0]['name']}" data-id='${res['room'][0]['id']}'>${res['room'][0]['name']}</option>
                    `
                    select.html('')
                    select.html(this_option)
                    console.log(select)
                    for(i in res['room_all']){
                         if (res['room'][0]['id']!=res['room_all'][i].id){
                              console.log(res['room_all'][i].name)
                              append_option=`                        
                              <option  value="${res['room_all'][i].name}" data-id="${res['room_all'][i].id}">${res['room_all'][i].name}</option>
                          
                              `
                              select.append(append_option)

                         }

                         
                         
                         
                    }
      


               }
               $(document).ready(function(){

                    $('.select_romm_modal').change(function(e) {
                         console.log('mtassseasaasdasd')
                         var id_grop_select=$('#id_grups_select').val()
                         let start=$('#lesons_start_time1').val()
                         let end=$('#lesons_end_time1').val()
                         var room_id_=$(e.currentTarget).find('option:selected').attr('data-id',)
                         var veek_name=$(e.currentTarget).attr('id')
                    $.ajax({
                         method: "POST",
                         url: "/rooms/",
                         dataType: 'json',
                         data:{"week_name":$(e.currentTarget).attr('id'),"group_id":id_grop_select,'room_id':$(e.currentTarget).find('option:selected').attr('data-id',),
                         'start':start,'end':end,'select_room_in_calendar':'true','data':data_calendar},
                         cache : false,
                         }).done (function(res){
                              console.log(res)
                              let serch=$('#method_serch_create_edit').val()

                              if (res['eroor_room_time']){

                                   window.alert('Please choose another time.The room was reserved from '+res['eroor_room_time'][1]+'-'+res['eroor_room_time'][2]+' for  '+res['eroor_room_time'][0])
                                   $('#'+res['eroor_room_time'][3]).val(' ')
                                   $(e.currentTarget).val(' ')
                                  
                              }
                              if (res['noon']){
                                   window.alert("Place...Write Lesons Time ")
                                   $('#lesons_end_time1').css('background','red')
                                   $('#lesons_start_time1').css('background','red')
               
                              }
                              if (res['error_syntax']){
                                   for(let i=0;i<res['error_syntax'].length;i++){
                                        
                                        $('#lesons_'+res['error_syntax'][i].split('_')[1]+'_time1').css('background','red')
               
                                   }
                                   
                              };
                              if (res['error_parent_non']){
                                   for(let i=0;i<res['error_parent_non'].length;i++){
                                        $('#lesons_'+res['error_parent_non'][i].split('_')[1]+'_time1').css('background','red')
                                        $('#lesons_'+res['error_parent_non'][i].split('_')[1]+'_time1').focus()
               
                                   }
               
                              }
                              if (res['error_sravnenie']){
                                   for(let i=0;i<res['error_sravnenie'].length;i++){
                                        console.log(res['error_sravnenie'][i])
                                        for (let j in res['error_sravnenie'][i]){
                                             $('#lesons_start_time1').css('background','green')
                                             $('#lesons_end_time1').css('background','red')
                                             if(res['error_sravnenie'][i][j][0]===res['error_sravnenie'][i][j][1]){
                                                  window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'='+res['error_sravnenie'][i][j][1])
               
                                             }
                                             else {
                                                  window.alert(j.toUpperCase()+' '+res['error_sravnenie'][i][j][0]+'>'+res['error_sravnenie'][i][j][1])
               
               
                                             }
               
                                             
                                             
                                             
                                        }
                                    
               
                                   }
               
                              }
               
                             
                              let alert=true
                              var x=0
                              if (res['eror_teacher_work']){
               
                                   console.log(res['eror_teacher_work'])
                                   for(let i in res['eror_teacher_work_time']){
                                        if (alert){
                                             console.log(res['eror_teacher_work_time'][i])
                                             window.alert('Teacher Work Time '+res['eror_teacher_work_time'][i]['teacher'][2]+' Start='+res['eror_teacher_work_time'][i]['teacher'][0]+'   Finish time='+res['eror_teacher_work_time'][i]['teacher'][1])
               
                                        }
                                        $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).val('')
                                        $("#"+res['eror_teacher_work_time'][i]['teacher'][3]).css('background','red')
                                        alert=false
                                        if(x==2){
                                             alert=true
                                             x=0
               
                                        }
               
                                        x++
               
               
                                   }
                              }
                              alert=true
                              x=0
                       
                              if (res['eror_teacher_work']){
                                   for(let i=0;i<res['eror_teacher_work'].length;i++){
                                        $('#'+res['eror_teacher_work'][i]).val('')
                                        if(alert){
                                             window.alert('Teacher in not working on  '+res['week_name_eroor'][i])
                                             alert=false
               
                                        }
                                        if(x==2){
                                             alert=true
                                             x=0
                                            
               
                                        }
               
                                        x++
                                        
               
                                   }
                              }
               
                              if(res['ok']){
                                   console.log(serch)
                                   if (res['serch']){
                                   let save_elemnt=`                                     
                                   <div class="w-20">
                                   <div class="save-icon">
                         
                                       <i class="fa fa-check"></i>
                                       <a href='#'  onclick="save('${room_id_}','${data_calendar}','${veek_name}'); return false;">Save</a>
                                   </div>
                               </div>`
                                   $("#save_and_edit").html(save_elemnt)
                                   }
                                   else{
                                        let save_elemnt=`                                     
                                        <div class="w-20">
                                        <div class="save-icon">
                              
                                            <i class="fa fa-edit"></i>
                                            <a href='#'  onclick="edit_lesons_calendar('${room_id_}','${data_calendar}','${veek_name}'); return false;">Edit</a>
                                        </div>
                                    </div>`
                                        $("#save_and_edit").html(save_elemnt)
                                        
                                   }

                                   
                                   
                         }
                    
                              })
                         
                         })
                    })
                         




          });
}
function save(room_id,data_calendar,week_name){
     var id_grop_select=$('#id_grups_select').val()
     let start=$('#lesons_start_time1').val()
     let end=$('#lesons_end_time1').val()
     $.ajax({
          method: "POST",
          url: "/rooms/",
          dataType: 'json',
          data:{"week_name":week_name,"group_id":id_grop_select,'room_id':room_id,
          'start':start,'end':end,'select_room_in_calendar':'true','data':data_calendar,'save_non_valid':'yes'
          },
          cache : false,
          }).done(function(res){

          let new_lesons=$(document).find('.calend').find('div[data-name="'+data_calendar+'"]')
               
          $(document).find('.calend').find('div[data-name="'+data_calendar+'"]').addClass('newClass')
          if (res['status']=="Done"){
               let done_lesons=`<div class="check-circle">✓</div>`
               new_lesons.append(done_lesons)
          }
          if (res['status']=="In progress"){
               let done_lesons=`<i class="fa fa-clock-o" aria-hidden="true"></i>`
               new_lesons.append(done_lesons)
          }
          
          
          let hover_efect=`<div class="hover-effect"></div>`
          new_lesons.append(hover_efect);
          let reset=` <p class = "text-contract-second">Lesson Start date</p>
          <div class = "contract-date-start" id="lesons_start_time">${res['lesons_time'][0]}</div>
          <div class = "at">-</div>
          <div class = "contract-date-start" id="lesons_end_time">${res['lesons_time'][1]}</div>
          `          
          $("#add_new_lesons_time").html(reset)
          
          
          
          new_lesons.append('<style>.newClass::before{content:" ";\n' +
              '\tbackground-color: rgba(75,146,58,0.4);\n' +
              '\twidth:30px;\n' +
              '\theight: 30px;\n' +
              '\tposition: absolute;\n' +
              '\tborder-radius: 100%;\n' +
              '\tz-index: -1;}</style>');
          //     new_lesons.data('start-time',res['lesons'][i].leson_time_start);
          //     new_lesons.data('end-time',res['lesons'][i].leson_time_end);
          
          
              new_lesons.on('click', function() {
               console.log($(this))

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
     });
}
function edit_lesons_calendar(room_id,data_calendar,week_name){
     var id_grop_select=$('#id_grups_select').val()
     let start=$('#lesons_start_time1').val()
     let end=$('#lesons_end_time1').val()
     $.ajax({
          method: "POST",
          url: "/rooms/",
          dataType: 'json',
          data:{"week_name":week_name,"group_id":id_grop_select,'room_id':room_id,
          'start':start,'end':end,'select_room_in_calendar':'true','data':data_calendar,'edit_non_valid':'yes'},
          cache : false,
          }).done(function(res){
               let reset=` <p class = "text-contract-second">Lesson Start date</p>
               <div class = "contract-date-start" id="lesons_start_time">${res['lesons_time'][0]}</div>
               <div class = "at">-</div>
               <div class = "contract-date-start" id="lesons_end_time">${res['lesons_time'][1]}</div>
               `          
               $("#add_new_lesons_time").html(reset)


          })


}
function delete_leosnons(data){
     console.log(data)
     var id_grop_select=$('#id_grups_select').val()
     $.ajax({
          method: "POST",
          url: "/comment/"+id_grop_select+"/",
          dataType: 'json',
          data:{"data_delet":data,"group_id":id_grop_select},
          cache : false,
          }).done(function(res){
               console.log(res)
               if (res['ok']){
                     let div_lesons=$(document).find('.calend').find('div[data-name="'+data+'"]')
                     div_lesons.removeClass('newClass')
                  
                     div_lesons.html(res['ok'])
                     div_lesons.data('start-time','');
                     div_lesons.data('end-time','');
                     console.log(div_lesons)
                     let reset=` <p class = "text-contract-second">Lesson Start date</p>
                     <div class = "contract-date-start" id="lesons_start_time"></div>
                     <div class = "at">-</div>
                     <div class = "contract-date-start" id="lesons_end_time"></div>
                     `          
                     $("#add_new_lesons_time").html(reset)

               }
 




          })
}
function add_comment(data){
     console.log( $("#add_new_lesons_time"))
     var id_grop_select=$('#id_grups_select').val()
     var comment='asasa'


     $.ajax({
          method: "POST",
          url: "/comment/"+id_grop_select+"/",
          dataType: 'json',
          data:{"coment_data_serch":data},
          cache : false,
          }).done(function(res){
               console.log(res)
               if (res['serch']){
                    let input1=`
                         <div class="d-flex align-items-center">
                    
                    
                         <p class = "text-contract-room">Comment :</p>
                         <textarea name="" id="comment_lesons" cols="30" rows="10" style="margin-top: 0px;margin-bottom: 0px;height: 57px;"></textarea>
                         </div>
                         <div id='save_and_edit' style="display: contents;">
                    
                         <div class="w-20">
                         <div class="save-icon">
               
                             <i class="fa fa-check"></i>
                             <a href='#' onclick="save_and_edit_comment('save','${data}'); return false;" >Save</a>
                         </div>
                     </div>`
                         

                         $("#add_new_lesons_time_comment").html(input1)
                         console.log('areci')
               }
               else{
                    let input1=`
                    <div class="d-flex align-items-center">
               
               
                    <p class = "text-contract-room">Comment :</p>
                    <textarea name="" id="comment_lesons" cols="30" rows="10" style="margin-top: 0px;margin-bottom: 0px;height: 57px;">${res['comment']}</textarea>
                    </div>
                    <div class="w-20">
                    <div class="save-icon">
          
                        <i class="fa fa-edit"></i>
                        <a href='#'  onclick="save_and_edit_comment('edit','${data}'); return false;" >Edit</a>
                    </div>
                </div>`
                    

                    $("#add_new_lesons_time_comment").html(input1)
                    console.log('areci')

               }

               // if (res['ok']){
               //       let div_lesons=$(document).find('.calend').find('div[data-name="'+data+'"]')
               //       div_lesons.removeClass('newClass')
                  
               //       div_lesons.html(res['ok'])
               //       div_lesons.data('start-time','');
               //       div_lesons.data('end-time','');
               //       console.log(div_lesons)
               //       let reset=` <p class = "text-contract-second">Lesson Start date</p>
               //       <div class = "contract-date-start" id="lesons_start_time"></div>
               //       <div class = "at">-</div>
               //       <div class = "contract-date-start" id="lesons_end_time"></div>
               //       `          
               //       $("#add_new_lesons_time").html(reset)

               // }
 




          })

}
function save_and_edit_comment(method,data){
     var id_grop_select=$('#id_grups_select').val()
     var comment=$('#comment_lesons').val()

     $.ajax({
          method: "POST",
          url: "/comment/"+id_grop_select+"/",
          dataType: 'json',
          data:{"method":method,'data':data,'comment':comment},
          cache : false,
          }).done(function(res){
               $("#add_new_lesons_time_comment").html('')


          })


}
