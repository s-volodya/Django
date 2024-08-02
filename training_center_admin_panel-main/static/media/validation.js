
$(function () {

    $("#valid").hide();
    $("#invalid").hide();
    let valid = $("#container");

    // $("#date").datepicker({
    //     minDate: 14,
    //     numberOfMonths: 1,
    //     dateFormat: "dd/mm/yy",
    //     onSelect: function(selectdate) {
    //         var dt = new Date(selectdate);
    //         dt.setDate(dt.getDate()+1);
    //       $("#date").datepicker("option","minDate", dt);
    //     }
    // });

    $("#date").on("change", function(){
        var fromdate = $(this).val();
        $("#date").prop('min', function(){
            return fromdate;
        })
    });

    if (valid.length) {
        valid.validate({
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                },
                date: {
                    required: true,
                    date: true,
                    dateISO: true
                },
                surname: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: "Please enter Name!",
                },
                email: {
                    required: "Please enter email!",
                    email: "Please enter valid email"
                },
                surname: {
                    required: "Please enter Surname!"
                },
                date: {
                    required: 'Please select date!',
                },
            }
        })
    }
})