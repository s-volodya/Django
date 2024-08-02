$(".input_admin_profile").hide();



$("#admin_profie_save").on("click", function(){

if($("#admin_profie_save").hasClass("save")){
    let name=  $(".input_admin_name").val()
    let surname=  $(".input_admin_surname").val()
    let email=$(".input_admin_email").val()
    let company_name=$(".input_admin_companyname").val()
    let phone_number=$(".input_admin_number").val()
    var f_obj = $("#file_company_logo").get(0).files[0];
    let formData = new FormData();
 

    formData.append('file', f_obj);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('company_name',company_name);
    formData.append('phone_number',phone_number);

    $.ajax({
    method: "POST",
    url: "/admin_info/",
    dataType: 'json',
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    data:formData,
    cache : false,
    }).done(function(res){
    $(".label_admin_name").html(res['admin_info'][0]['first_name']);
    $(".label_admin_surname").html(res['admin_info'][0]['last_name']);
    $(".label_admin_email").html(res['admin_info'][0]['email']);
    $(".label_admin_companyname").html(res['admin_info'][0]['company_name']);
    $(".label_admin_number").html(res['admin_info'][0]['phone_number']);
  
    $(".label_admin_profile").show();
    $(".input_admin_profile").hide();
    $("#admin_profie_save").html("Edit")

    // addclass removeclass
    $("#admin_profie_save").addClass("edit");
    $("#admin_profie_save").removeClass("save"); 
    $('#logo_company').html(`
    <img src ='${res['logo_url']}' >
    `)
    $('.img_logo').attr("src",res['logo_url']);  
    // console.log("save")
    console.log(res) 

    });

}  
else{
    console.log($(".label_admin_email").text());
    // inputs html to labels
    $(".input_admin_name").val($(".label_admin_name").text());
    $(".input_admin_surname").val( $(".label_admin_surname").text())
    $(".input_admin_email").val(  $(".label_admin_email").text())
    $(".input_admin_companyname").val($(".label_admin_companyname").text())
    $(".input_admin_number").val($(".label_admin_number").text())
    
    $(".label_admin_profile").hide();
    $(".input_admin_profile").show();
    $("#admin_profie_save").html("Save")

    // addclass removeclass   
    $("#admin_profie_save").removeClass("edit");     
    $("#admin_profie_save").addClass("save");

   console.log("edit") 
}

})