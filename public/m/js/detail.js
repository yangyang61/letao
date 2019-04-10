$(function(){

    //获取传过来的id
    var id = getQueryString('id');

    queryProductDetail();
    addCart();

    //查询商品详情
    function queryProductDetail(){
         $.ajax({
            url: '/product/queryProductDetail',
            data:{id: id},
            success: function(data){
                // console.log(data);
                
                var min = +data.size.split('-')[0];
                var max = +data.size.split('-')[1];
                data.size = [];
                for(var i=min;i<=max;i++){
                    data.size.push(i);
                }

                var html = template('productDetailTpl',data);

                $('#main').html(html);

                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });

                // 初始化数字框
                mui('.mui-numbox').numbox();

                //点击尺码添加类名
                $('.btn-size').on('tap',function(){
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                });

                //初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005//flick 减速系数，系数越大，滚动速度越慢 滚动距离越小，默认0.0006
                });

            }
         })
    }

    //加入购物车
    function addCart(){

        $('.btn-add-cart').on('tap',function(){
            //获取当前尺码和数量  id在上面 
            var size = $('.btn-size.mui-btn-warning').data('size');

            var num = mui('.mui-numbox').numbox().getValue();

            //console.log(size,num);

            $.ajax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: size
                },
                success: function(data){
                    console.log(data);
                    if(data.error){
                        location = 'login.html?returnUrl=' + location.href;
                    }else{
                        mui.confirm('加入成功，去购物车看看吧~','主淫',['去看看','不了'],function(e){
                            if(e.index == 0){
                                location = 'cart.html';
                            }else{
                                mui.toast('宝贝在购物车等你哟~',{
                                    duration: 1000,
                                    type: 'div'
                                });
                            }
                        });
                    }
                }
            });
            

        });
    }

});