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


    // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            console.log(r);
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
});