$(function(){

    queryCart();

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
                //返回的数据是一个数组，so
                var html = template('queryCartTpl',{data: data});

                $('.cart-list').html(html);
                
                
            }
        });
    }
});