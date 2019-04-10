$(function(){

    login();

    //登录功能的函数
    function login(){

        $('.btn-login').on('tap',function(){
            //获取用户名和密码
            var username = $('.username').val().trim();
            var password = $('.password').val().trim();
            //判断用户名和密码是否为空
            if(!username){
                mui.toast('请输入用户名',{
                    duration: 'short',
                    type: 'div'
                });
                return;
            }else if(!password){
                mui.toast('请输入密码',{
                    duration: 'short',
                    type: 'div'
                });
                return;
            }

            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function(data){
                    if(data.error){
                        mui.toast(data.message,{
                            duration: 'short',
                            type: 'div'
                        });
                    }else{
                        var returnUrl = getQueryString('returnUrl');
                        location = returnUrl;
                    }
                }
            });
        });

    }

});