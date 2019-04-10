$(function(){

    queryUserMessage();
    exit();

    //查询用户信息
    function queryUserMessage(){

        $.ajax({
            url: '/user/queryUserMessage',
            success: function(data){
                if(data.error){
                    location = 'login.html?returnUrl=' + location.href;
                }else{
                    $('.username').html(data.username);
                    $('.mobile').html(data.mobile);
                }
            }
        });
    }

    //点击退出 登录
    function exit(){
        $('.btn-exit').on('tap',function(){
            mui.confirm('确定退出登录吗?','温馨提示',['确定','取消'],function(e){
                if(e.index == 0){
                    $.ajax({
                        url: '/user/logout',
                        success: function (data) {  
                            if(data.success){
                                location = 'login.html?returnUrl=' + location.href;
                            }
                        }
                    });
                }
            });
        });
    }
});