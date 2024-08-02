$.ajax({
    method: "GET",
    url: "/user_info/",
    dataType: 'json',
    data:{'get_user_info':'ok'},
    cache : false,
    }).done(function(res){
        $("#user_name_login").html(
            `
                <span style="color: white;">${res["user_name"]}</span>  <img src="${res['user_img']}" alt="" class="img15">
                <select name="" id="select_inp">
                </select>
                <a  class="select_i" ><i class="fas fa-caret-down" style="font-size : 20px !important;"></i></a>
                <div class="select_page">
                    <ul>
                        <li><a href="/admin_info/" class="admin_profile_a"><image src="/static/img/user-regular.png"><span>Profile</span></a></li>
                        <li><a class="admin_profile_a"><image src="/static/img/symbol_dolar.png"><span>Payment</span></a></li>
                        <li><a href="/login/"><span class="glyphicon glyphicon-log-out"></span><span>Log Out</span></a></li>
                    </ul
                </div>
            `
        )
        $('.img_logo').attr("src",res['logo_company']);
        
        console.log(res['logo_company'])
        
        $("#subjects_all").html(`
        <li class="subjects_id for_li" >
        <a id="add_subject_sidebar" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">  Add Subjects</a>
    </li>

        `)
        for(let i=0; i<res['subjects'].length ; i++){
            $("#subjects_all").append(`
                <li class="subjects_id for_li" >
                    <a href="/subjects/${res['subjects'][i]['id']}/">  ${res['subjects'][i]['name']}</a>
                </li>
            `)
            
        }
        let leng = {'ru':'Руc','en':'Eng','arm':"Հայ"}
        let option_select = ''
        for (let i in leng){
            if (i!=res['site_leng']){
                option_select+="<option value='"+i+"' >"+leng[i]+"</option>"
                
            }
            else {
                $('#select_inp').append("<option value='"+i+"' >"+leng[i]+"</option>")
                
            }
        }
        $('#select_inp').append(option_select)


        

  
        $("#select_inp").change(function(){
            console.log('111111111111111111111111111111111111111111111111111')
            $.ajax({
                method: "GET",
                url: "/user_info/",
                dataType: 'json',
                data:{'leng':$(this).val()},
                cache : false,
                }).done(function(res){
                    location.reload()
                })
        })

        // select profile payment logout
        $(".select_i").on("click", function(){
            $(".select_page").toggle();
        })
 })
 $.ajax({
    method: "GET",
    url: "/user_info/",
    dataType: 'json',
    data:{'sign_in_one_user':'ok'},
    cache : false,
    }).done(function(res){
        console.log(res)
        if(res['sign_in_one_user']){
            console.log('ka')
            localStorage.setItem('info', ['student_list','teacher_list']);
        }


    })
function info(page_name,info_text){
        var localValue = localStorage.getItem('info');
    
        let get_local_value=localValue.split(',')
        let nev_local_storage_value =  []
    
        for (let i = 0 ;i < get_local_value.length; i++ ){
            if (page_name === get_local_value[i]){
                help_html=`
                        <div class="student_helper_container">
                            <a href="#"><img id="triangle" style="position: absolute; opacity: 700000;margin-left: 33.7%; margin-top: 180px;" src = "/static/img/arrow-tooltip.png"></a>
                            <div id="add_student_helper" style=" width: 115%; min-height: 100%; height: auto; top:0; ;position: absolute; z-index: 7000;padding: 150px 0;">
                                <div style="margin-top: 150px;">
                                    <div class="students_info_div">
                                        <div>     
                                            <a href="#"><img id="i" src = "/static/img/information.png"></a>
                                            <span  class="students_info_span">${info_text} </span>
                                        </div>
                                        <button class="students_info_btn_ok">OK</button>
                                    </div>        
                                </div>
                            </div>
                        </div>
                `
                console.log('mtaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                $('#helper_text').html(help_html)
               
            }

            else{
                nev_local_storage_value.push(get_local_value[i])
                
            }
        }
        localStorage.clear()
        console.log(nev_local_storage_value)
        delete localStorage["info"];
        localStorage.setItem('info',nev_local_storage_value);
    
        }
    

