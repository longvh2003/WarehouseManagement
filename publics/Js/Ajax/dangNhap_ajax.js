$(document).ready(function(){
    $("#login").on('click',function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var todo = {
            username : username,
            password : password
        }
        $.ajax({
            url : '/dangNhap',
            type : "POST",
            data : todo,
            success : function(datas){
                if(datas == 'fail'){
                    alert('Thông tin đăng nhập của bạn không chính xác!');
                }
                else {
                    window.location.replace('/danhMuc');
                }
            }
        })
    })
})