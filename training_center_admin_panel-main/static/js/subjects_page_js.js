
function add_lesons_tables(id_lesons_table1) {

   $( document ).ready(function() {

    var file_validation_length=$("#id_file").val();
    var f_obj = $("#id_file").get(0).files[0];
    let lesons_name = $("#td_name_add"+id_lesons_table1+" #id_name").val();
    let lesons_discreption = $('#td_description_add'+id_lesons_table1+" #id_Description").val();
    let id_lesons_table = $('#name_component'+id_lesons_table1);
    let fail_lesons_table= $('#id_file').val();
    var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
    let formData = new FormData();
    formData.append('file', f_obj);
    formData.append('name', lesons_name);
    formData.append('Description', lesons_discreption);
    formData.append('id',id_lesons_table1);
    console.log(f_obj,lesons_name,lesons_discreption,fail_lesons_table);



    let data = `
        <td>dsds<td>
        <td>dsds<td>
        <td>dsdsd<td>
    `
        if(lesons_name.length>0 && lesons_discreption.length>0){
            $.ajax({
            csrfmiddlewaretoken: csrf_token,
            method: "POST",
            url: "/createSubject/",
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data:formData,
            cache : false,
            }).done(function(res) {
            let table_add = $('#table_bodi'+id_lesons_table1);
            let file_name 
            if (f_obj){
                file_name=f_obj.name
                console.log('stexov')
            

            }
            else{
                file_name='No File'
            }
            console.log(res)
                let data = `
                <tr id='tr_id_${res.id_new_add_lesons}'>
                <td scope="row"></td>
                <td><input  type="text" class="form-control"    name="id_lesons_edit" value="${res.id_new_add_lesons}"  hidden>

                     <p class="name_lesons" style="display:block;    white-space: pre-wrap;" id="id_lesons_edit_${res.id_new_add_lesons}">${res.text.name}</p>
                     <textarea  type="text" class="form-control"  id="input_name_lesons${res.id_new_add_lesons}" style="display:none;" name="edit_name_lesons" rows="5"></textarea>
                </td>
                <td>
                    <p  style="display:block;    white-space: pre-wrap;" id="description_lesons_edit_${res.id_new_add_lesons}">${res.text.Description}</p>
                    <textarea  type="text" class="form-control"  id="input_Description_edit${res.id_new_add_lesons}" style="display:none;" name="edit_description" rows="5"></textarea>

                </td>

                <td>
                    <a  style="display:block;" id="file_lesons_edit_${res.id_new_add_lesons}" href="${res['file_url']}" target="_blank">${file_name}</a>

                       <input type="image" src="../../../static/img/download@3x.png"  width="25px" style="display: none;margin-right: auto;margin-left:auto;" id="input_file_edit_${res.id_new_add_lesons}" onclick="clic_upload_input_edit(${res.id_new_add_lesons}); return false;" >
                       <input type="file"  class="form-control"  id="input_file_edit${res.id_new_add_lesons}"  hidden>
                       <br><p style="text-align: center;display:none" id="id_title_upload_file_name1${res.id_new_add_lesons}"   >Browse files </p>

                 </td>

                <td style="width: 109px;" >
                     <a id="edit_hiden${res.id_new_add_lesons}" onclick="edit_table(${res.id_new_add_lesons})" >
                     <i id="edit_${res.id_new_add_lesons}" class="fas fa-edit" title="edit_i"></i>
                     </a>

                     <a id="delete_hiden_${res.id_new_add_lesons}"  onclick=" Geeks(${res.id_new_add_lesons}) ">
                     <i id="delete_${res.id_new_add_lesons}" class="fas fa-trash-alt" title="delete_i" ></i>
                      </a>

                    <button  class="btn btn-info btn-lg" id="edit_button${res.id_new_add_lesons}" type="button" style="display:none;" onclick="edit_lesons_table(${res.id_new_add_lesons})">
                              <i id="12" class="fas fa-edit"></i>
                                   Edit
                              </button>
                     </td>
                     </tr>
            `
            table_add.append(data);
            $('#id_title_upload_file_name'+id_lesons_table1).html('Browse Files')
            $('#forma_id_lesons_input'+id_lesons_table1).trigger("reset");
            $("#id_file").val('')







            $( this ).addClass( "done" );
            });  };

    })
};





    function give(val) {
document.getElementById("name_section1").value = val;
};
function give1(val1,id,this_a) {
document.getElementById("name_component"+val1).value = val1;
let open=this_a.getAttribute('aria-expanded')
if (open==='true'){
    console.log('paka')
    $("#arraw_component"+id).css('transition','0.5s')
    $("#arraw_component"+id).css('transform','rotate(270deg)')

}
else {
   console.log('paka111')
   $("#arraw_component"+id).css('transition','0.5s')
    $("#arraw_component"+id).css('transform','rotate(360deg)')
}

};
function edit_section(id_sections) {
    let section_name_a=$("#sections_name_edit_"+id_sections).text();
    console.log(section_name_a)

document.getElementById("recipient-name").value = section_name_a;
document.getElementById("id_Sections_model").value = id_sections;
};
function del(id){
 var delet_element_li = document.getElementById("section_id_li"+id);
    delet_element_li.parentNode.removeChild(delet_element_li);
            $.ajax({
            method: "POST",
            url: "/createSubject/",
            dataType: 'json',
            data:{id:id,"metod":"delete_section"},
            cache : false,
            });
        };

function edit_table(id){
console.log(event)

   document.getElementById('id_lesons_edit_'+id).style="display: none;";
   document.getElementById('input_name_lesons'+id).style="display: block;";
   document.getElementById('input_name_lesons'+id).value =  document.getElementById('id_lesons_edit_'+id).textContent;

   document.getElementById('description_lesons_edit_'+id).style="display: none;";
   document.getElementById('input_Description_edit'+id).style="display: block;";
   document.getElementById('input_Description_edit'+id).value = document.getElementById('description_lesons_edit_'+id).textContent;

   document.getElementById('file_lesons_edit_'+id).style="display: none;";
   document.getElementById('input_file_edit_'+id).style="display: block;margin-right: auto;margin-left:auto;";
   document.getElementById('id_title_upload_file_name1'+id).style="display: block;text-align: center";



   document.getElementById('edit_hiden'+id).style="display: none;";
   document.getElementById('delete_hiden_'+id).style="display: none;";
   document.getElementById('edit_button'+id).style="display: block;";
};

function clic_upload_input(id_name_upload_files){
    console.log("aasdasd ayo");
    $("#id_file").click();
    $(document).ready(function(){
    $('#id_file').change(function() {
    var f_obj = $("#id_file").get(0).files[0].name;
    let file_name=$('#id_title_upload_file_name'+id_name_upload_files);
    let file_name1=`
    ${f_obj}

    `
    file_name.html(file_name1)
})
});

        };
function clic_upload_input_edit(id_name_upload_files1){
    console.log(id_name_upload_files1)

    $("#input_file_edit"+id_name_upload_files1).click();

    $(document).ready(function(){
    $("#input_file_edit"+id_name_upload_files1).change(function() {
    var f_obj = $("#input_file_edit"+id_name_upload_files1).get(0).files[0].name;
    let file_name=$('#id_title_upload_file_name1'+id_name_upload_files1);
    let file_name1=`
    ${f_obj}

    `
    file_name.html(file_name1)
})
});

        };


function Geeks(id_table) {
            console.log(id_table,'idnem');
            var delet_element_tr = document.getElementById("tr_id_"+id_table);
            delet_element_tr.parentNode.removeChild(delet_element_tr);
            $.ajax({
            method: "POST",
            url: "/createSubject/",
            dataType: 'json',
            data:{id:id_table,
                  method:"delete"  },
            cache : false,
            })
                        };
function edit_lesons_table(id_lesons_editor){
         $( document ).ready(function() {

    var file_validation_length=$("#input_file_edit"+id_lesons_editor).val();
    var f_obj = $("#input_file_edit"+id_lesons_editor).get(0).files[0];
    let nev_lesons_name = $("#input_name_lesons"+id_lesons_editor).val();
    let nev_lesons_discreption = $('#input_Description_edit'+id_lesons_editor).val();
    var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
    let formData = new FormData();
    formData.append('file', f_obj);
    formData.append('name', nev_lesons_name);
    formData.append('Description', nev_lesons_discreption);
    formData.append('id',id_lesons_editor);
    formData.append('method','edit');
    console.log(f_obj,file_validation_length,'fgufuufyufufgtyu');
     if (nev_lesons_name.length>0 && nev_lesons_discreption.length>0 ){
     $.ajax({
            csrfmiddlewaretoken: csrf_token,
            method: "POST",
            url: "/createSubject/",
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data:formData,
            cache : false,
            }).done(function(res) {
                console.log(res)
                    console.log(res['file'])

                    let lesons_name_at=$('#id_lesons_edit_'+id_lesons_editor);
                    let lesons_description_at=$('#description_lesons_edit_'+id_lesons_editor);
                    let lesons_file_at=$('#file_lesons_edit_'+id_lesons_editor);

                    let edit_lesons_name=`${nev_lesons_name}`
                    let edit_desciption_text=`${nev_lesons_discreption}`
                    let edit_lesons_file=`${res['file']}`
                    lesons_name_at.html(edit_lesons_name)
                    lesons_description_at.html(edit_desciption_text)
                    lesons_file_at.html(edit_lesons_file)
                    lesons_file_at.attr('href',res['file_url'])
                   

                    document.getElementById('id_lesons_edit_'+id_lesons_editor).style="display: block;white-space: pre-wrap;";
                    document.getElementById('description_lesons_edit_'+id_lesons_editor).style="display: block;white-space: pre-wrap;";
                    document.getElementById('file_lesons_edit_'+id_lesons_editor).style="display: block;";

                    document.getElementById('input_file_edit'+id_lesons_editor).style="display: none;";
                    document.getElementById('input_name_lesons'+id_lesons_editor).style="display: none;";
                    document.getElementById('input_Description_edit'+id_lesons_editor).style="display: none;";

                    document.getElementById('input_file_edit_'+id_lesons_editor).style="display: none;";
                     document.getElementById('id_title_upload_file_name1'+id_lesons_editor).style="display: none;";


                   document.getElementById('edit_hiden'+id_lesons_editor).style="";
                   document.getElementById('delete_hiden_'+id_lesons_editor).style="";
                   document.getElementById('edit_button'+id_lesons_editor).style="display: none;";

             $( this ).addClass( "done" );
            });


            };
         });

    };
function edit_section_views(){
    let sections_name=$('#recipient-name').val();
     let sections_id=$('#id_Sections_model').val();
    if(sections_name.length>0){
        $.ajax({
            method: "POST",
            url: "/createSubject/",
            dataType: 'json',
            data:{sections_edit_name:sections_name,
                  id_section:sections_id,
                  'method':'edit_section'
                  },
            cache : false,
            }).done(function(res){
            console.log("prca")
            let show_elemnt=$("#sections_name_edit_"+sections_id);
             console.log(show_elemnt)
            let update_edit_name=`${sections_name}`
            show_elemnt.html(update_edit_name);
            $( this ).addClass( "done" );

            });
    }
}
function edit_component(id) {
//     let component_name_a=$("#sections_name_edit_"+id).text();
//     console.log(section_name_a)

// document.getElementById("recipient-name").value = component_name_a;
// document.getElementById("id_Sections_model").value = id;


$("#component_edit").val($("#component_name"+id).text())
$("#component_id").val(id)

};
function save_edit_component_name(){
   let edit_name=$("#component_edit").val()
   let id=$("#component_id").val()
   $('#component_name'+id).html(edit_name)
   $('#close_modal_component_edit').click()
   $.ajax({
    method: "POST",
    url: "/createSubject/",
    dataType: 'json',
    data:{'edit_section_name':edit_name,
          'edit_component_id':id,
          'method':'edit_component_'
          },
    cache : false,
    }).done(function(res){
        
    });


}
function del_component(id){
    
    $.ajax({
        method: "POST",
        url: "/createSubject/",
        dataType: 'json',
        data:{'delet_component_id':id,
              },
        cache : false,
        }).done(function(res){
            $("#component_div"+id).remove()
        });

}
