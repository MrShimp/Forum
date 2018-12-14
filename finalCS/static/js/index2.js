
$(document).ready(function () {
    var $productDisplay = document.getElementById('productDisplay');

    var  datas = '{{ datas | tojson }}';
    console.log(datas);

    var loc = 'http://127.0.0.1:1000/';
    $('#chatroom').click(function(){
      var user = 'user1@gmail.com';
      $(this).attr('herf',loc+'?email='+user);
    })

    $.ajaxSetup ({
        cache: true,
        async: false
    });

    /***        search by input         ***/
    // check empty or all is space
    function isNull(str){
        if ( str === "" || str === null || str === undefined ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }
    $('#buttonSearch').on('click', function(e){
        e.preventDefault();

        var selectRecord = document.getElementById('selectRecord').value;
        if (isNull(selectRecord)){
            alert('illegal input')
        }

        while($productDisplay.hasChildNodes()) //当elem下还存在子节点时 循环继续
        {
            $productDisplay.removeChild($productDisplay.firstChild);
        }

        console.log(selectRecord);

        $.getJSON('http://127.0.0.1:5000/', {'search': selectRecord}, function(data) {
            console.log(typeof(data));
            console.log((data.length));
            if (data != null || data !== undefined){
                appendNodeProduct(data.slice(0, data.length));                
            }
        });
    });


    /***            display the product by adding the children          ***/
    function appendNodeProduct(datas){
        console.log("in the function");
        for (var i=0;i<datas.length;i++){
            var childNode = '<div class="col">\n'+
                '  <div class="card" style="width:820px;">\n'+
                '     <a href="#"><img class="card-img-top" src="{{ url_for(\'static\', filename=\'img/index_img/samuel-zeller-250040-unsplash.jpg\') }}" alt=""></a>\n'+
                '      <div class="card-body">\n'+
                '          <h5 class="card-title ">\n'+
                '              <a href="#">'+datas[i].title+'</a>'+
                '          </h5>\n'+
                '          <h5>'+datas[i].content+'</h5>\n'+
                '          <p class="card-text">'+datas[i].com+'</p>\n'+
                '          <div class="input-group mb-3 chatinput" id="chatinput">\n'+
                '            <input type="text" class="form-control"  aria-describedby="button-addon2">\n'+
                '            <div class="input-group-append">\n' +
                '              <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>\n'+
                '            </div>\n'+
                '          </div>\n'+
                '          <button type="button" class="btn btn-light float-right" id="chatbutton" name="button"><img src="img/index_img/liuyan.png" class="tixingimg"alt=""></button>\n'+
                '      </div>\n'+
                '    <div class="card-footer">'+
                '     </div>' +
                '  </div>' +
                '</div>';

            $('#productDisplay').append(childNode);
        }
    }


});
