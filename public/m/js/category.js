$(function(){
    initScroll();
    queryTopCategory();
    querySecondCategory(1);
});

// 初始化区域滚动插件
function initScroll(){
    
    // 初始化左侧不要滚动条
    mui('.category-left .mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 初始化右侧 需要滚动条
    mui('.category-right .mui-scroll-wrapper').scroll({
        indicators: true, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
}

//查询左侧分类列表
function queryTopCategory(){
    $.ajax({
        url: '/category/queryTopCategory',
        success:function (data) { 
            // console.log(data);
            var html = template('leftTpl',data);
            $('.category-left ul').html(html);
         }
    });
}

//查询左侧分类列表
function querySecondCategory(id){
    $.ajax({
        url: '/category/querySecondCategory',
        data: {id: id},
        success: function(data){
            // console.log(data);
            var html = template('rightTpl',data);
            $('.mui-scroll .mui-row').html(html);

            toggleSecondCategory();
        }
    })
}

//点击显示相应的二级分类
function toggleSecondCategory(){

    $('.mui-table-view-cell').on('tap',function(){
        var id = $(this).data('id');
        console.log(id);
        querySecondCategory(id);

        $(this).addClass('active').siblings().removeClass('active');
    });
}