        function add()
        {
            document.getElementById('addform').click();
        }
        function edit(id)
        {
            document.getElementById('editinput').value = id;
            document.getElementById('editform').click();
        }
        function del(id)

        { 
            if (confirm("Delete !")){
                $.ajax({
                    method: "POST",
                    url: "/students/",
                    dataType: 'json',
                    data:{'student_id':id}
                    }).done(function(res){
                        location.reload();
                    });
            }
        }



setTimeout(() => {
        if (localStorage["info"]){
            console.log('mtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssss')
    info('student_list','You can add students info by clicking this button ')
}
    }, 500);




