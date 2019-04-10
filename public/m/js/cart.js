$(function(){

    queryCart();
    deleteCart();
    editCart();
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005//flick 减速系数，系数越大，滚动速度越慢 滚动距离越小，默认0.0006
    });

    //查询购物车商品的函数
    function queryCart() {
        
        $.ajax({
            url: '/cart/queryCart',
            success: function(data){
                // console.log(data);
                if(data.error){
                    location = 'login.html?returnUrl=' + location.href;
                    return;
                }
                //返回的数据是一个数组，so
                var html = template('queryCartTpl',{data: data});

                $('.cart-list').html(html);
                
                getSum();
                $('.mui-checkbox input').on('change',function(){
                    getSum();
                })
                
            }
        });
    }

    //点击删除商品
    function deleteCart(){
        $('.cart-list').on('tap','.btn-delete',function(){

            //获取id
            var id = $(this).data('id');
            // console.log(id);

            //找到要删除的li
            var li = $(this).parent().parent();

            mui.confirm('确认删除该商品吗？','温馨提示',['确定','取消'],function(e){
                if(e.index == 0){
                    //确定，删除该商品
                    $.ajax({
                        url: '/cart/deleteCart',
                        data: {id: id},
                        success: function(data){
                            if(data.success){

                                li.remove();

                                //刷新购物车页面
                                queryCart();
                            }
                        }
                    });
                }else{
                    //取消，隐藏ta
                    setTimeout(() => {
                        mui.swipeoutClose(li[0]);
                    }, 0);
                }
            });
            
        });
    }

    //点击编辑商品
    function editCart(){
        $('.cart-list').on('tap','.btn-edit',function(){
            //找到li
            var li = $(this).parent().parent();

            //拿到商品数据
            var data = $(this).data('product');
            // console.log(data);
            
            //尺码搞成数组
            var min = +data.productSize.split('-')[0];

            var max = +data.productSize.split('-')[1];
            data.productSize = [];
            for(var i=min;i<=max;i++){
                data.productSize.push(i);
            }

            //调用编辑模板
            var html = template('editCartTpl',data);

            //吧html去掉回车、空格
            html = html.replace(/[\r\n]/g,'')
            // console.log(html);
            
            mui.confirm(html,'编辑商品',['确定','取消'],function(e){
                if(e.index == 0){
                    var size = $('.btn-size.mui-btn-warning').data('size');

                    var num = mui('.mui-numbox').numbox().getValue();

                    $.ajax({
                        url: '/cart/updateCart',
                        type: 'post',
                        data: {
                            id: data.id,
                            size: size,
                            num: num
                        },
                        success: function(data){
                            if(data.success){
                                queryCart();
                            }
                        }
                    });
                }else{
                    mui.swipeoutClose(li[0]);
                }

            });
            //初始化数字框
            mui('.mui-numbox').numbox();
            
            $('.btn-size').on('tap', function () {
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            });
        });
    }

    //计算订单
    function getSum(){
        //获取所有选中的复选框
        var checkeds = $('.mui-checkbox input:checked');
        var sum = 0;
        checkeds.each(function(index,value){
            var price = $(value).data('price');

            var num =  $(value).data('num');
            
            var count = price * num;
            sum += count;
            
        });

        //保留俩位小数
        sum = sum.toFixed(2)
        // console.log(sum);
        
        $('.order-count span').html(sum);
    }
});