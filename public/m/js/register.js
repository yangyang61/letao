$(function () {

    getVcode();
    register();
    var vCode = '';

    //点击获取验证码
    function getVcode(){

        $('.btn-get-vcode').on('tap',function () {  
            $.ajax({
                url: '/user/vCode',
                success: function(data){
                    console.log(data.vCode);                  
                    vCode = data.vCode;
                }
            });
        });
    }


    //注册
    function register(){
        $('.btn-register').on('tap',function(){
            //开关思想，默认check为true表示验证通过
            var check = true;

            mui(".mui-input-group input").each(function(){
                if(!this.value || this.value.trim() == ''){
                    var label = this.previousElementSibling;
                    mui.alert(label.innerText + "不允许为空！");
                    check = false;
                    return false;
                }
            });

            if(check){
                var mobile = $('.mobile').val().trim();
                //验证手机号码是否合法
                if(!isPoneAvailable(mobile)){
                    mui.toast('手机号输入不合法', {
                        duration: 'long',
                        type: 'div'
                    });
                    return;
                }

                var username = $('.username').val().trim();
                if(username.length >= 10){
                    mui.toast('您的用户名太长了', {
                        duration: 'long',
                        type: 'div'
                    });
                    return;
                }

                var password1 = $('.password1').val().trim();
                var password2 = $('.password2').val().trim();
                if(password1 != password2){
                    mui.toast('两次输入的密码不一致', {
                        duration: 'long',
                        type: 'div'
                    });
                    return;
                }
                var vcode = $('.vcode').val().trim();
                if(vcode != vCode){
                    mui.toast('验证码输入错误', {
                        duration: 'long',
                        type: 'div'
                    });
                    return;
                }

                $.ajax({
                    url: '/user/register',
                    data: {
                        username: username,
                        password: password1,
                        mobile: mobile,
                        vCode: vCode
                    },
                    type: 'post',
                    success: function(data){
                        if(data.error){
                            mui.toast(data.message, {
                                duration: 'long',
                                type: 'div'
                            });
                        }else{
                            location = 'login.html?returnUrl=user.html'; 
                        }
                    }
                });
            }
        });
    }

    //验证手机号是否合法的函数
    function isPoneAvailable(mobile) {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            return false;
        } else {
            return true;
        }
    }
});