        function add()
        {
            window.location = "/addgroup/"
        }
        function allowDrop(ev) {
            if(ev.target.tagName == "DIV")
                ev.preventDefault();
        }

        function drag(ev) {
            scroll: 'true',
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var idOfElement = data.substring(4)
            ev.target.appendChild(document.getElementById(data));
            $.post({
                url: "/groups/",
                data: {
                    csrfmiddlewaretoken: '{{ csrf_token }}',
                    user:  idOfElement,
                    group: ev.target.id.substring(3)
                }
            }).done(function(res){
                location.reload()
            })
           
        }
        

        // drag ang drop
        $('.changeback').draggable({
            scroll: 'true',
            refreshPositions: true
        });
        
        $('.div1').droppable({
            accept: '.changeback',
            activeClass: 'active',
            hoverClass: 'hover',
            tolerance: 'pointer'
        });







