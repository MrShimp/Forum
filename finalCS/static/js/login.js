/* $(document).ready(function () {
    $('#LoginConfirm').on('click',function(e){
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        if (isNull(username)||isNull(password)){
            alert('illegal input')
        }
        $.getJSON('http://127.0.0.1:5000/', {'search': username,password}, function(data) {
            console.log(typeof(data));
            console.log((data.length));
            if (data != null || data !== undefined){
                window.location.href ="../client/login.html";;
            }
        });
    });
}
*/
function doLogin() {
    var login = false;
    $.ajax({
        url: '/login',
        data: "username=" + $("#username").val() + "&password=" + $("#password").val(),
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        async: false,
        success: function (d) {
            var status = d.status;
            console.log(status);
            if (status != undefined && status != '') {
                if (status == "-1") {
                    alert("认证异常");
                    login = false;
                } else {
                    login = true;
                }
            } else {
                alert("用户名或密码错误！");
                login = false;
            }
            }
        });
        return login;
}
