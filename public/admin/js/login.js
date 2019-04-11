$(function(){

    login();

    //点击等录啊
    function login(){

        $('.btn-login').on('click',function(){
            var username = $('.username').val().trim();
            var password = $('.password').val().trim();

            if(username == ''){
                alert('请输入用户名');
            }else if(password == ''){
                alert('请输入密码');
            }else{
                $.ajax({
                    url: '/employee/employeeLogin',
                    type: 'post',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function(data){
                        if(data.success){
                            location = 'index.html';
                        }else{
                            alert(data.message);
                        }
                        
                    }
                });
            }

            
        });
    }
}); 