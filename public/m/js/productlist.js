$(function (){

    var search,page;

    searchProduct();
    nowSearchProduct();
    sortProduct();
    pullProduct();
    gettoDetail();
    //接受参数并搜索的函数
    function searchProduct(){

        search = getQueryString('search');

        queryProduct({proName: search,page: 1,pageSize: 2});

    }

    //定义当前按钮搜索的函数
    function nowSearchProduct(){

        $('.btn-search').on('tap',function(){
            search = $('.input-search').val().trim();

            if(search == null){
                return;
            }

            queryProduct({proName: search,page: 1,pageSize: 2});
        });

    }

    //公共请求api
    function queryProduct(data){
        data.page =  data.page || 1,
        data.pageSize = data.pageSize || 2,
        $.ajax({
            url: '/product/queryProduct',
            data: data,
            success: function(res){
                //console.log(res);
                var html = template('productlistTpl',res);
                //console.log(html);
                
                $('.product-list .mui-row').html(html);

                mui('#pullrefresh').pullRefresh().refresh(true);
                page = 1;
            }
        });
    }

    //商品排序
    function sortProduct(){

        //1给所有那啥添加点击事件
        $('.product-list .mui-card-header a').on('tap',function(){
            
            //2.获取当前排序类型 data-type
            var type = $(this).data('type');
            //console.log(type);

            //3.获取当前排序顺序 data-sort
            var sort = $(this).data('sort');
            //console.log(sort);

            //4.修改data-sort的值
            if(sort == 1){
                sort = 2;
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                sort = 1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }

            //5.修改完了重新给当前元素设置这个属性值
            $(this).data('sort',sort);
            //console.log(sort);

            //6.当前点击的那啥腰间盘突出
            $(this).addClass('active').siblings().removeClass('active');
            
            //7.这就是调用公共函数的参数了
            var obj = {
                proName: search,
                page: 1,
                pageSize: 2
            }

            //8.给上面的obj动态添加一个属性，直接在上面写会出问题的啊
            obj[type] = sort;
            //console.log(obj);

            //9.调用函数就ok了
            queryProduct(obj);

        });
    }

    //下拉刷新和下拉加载更多
    function pullProduct(){
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    contentdown: "下拉刷新",
                    contentover: "松手即可刷新",
                    contentrefresh: "拼命加载中",
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(() => {
                queryProduct({
                    page: 1,
                    pageSize: 3,
                    proName: search
                });
    
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500);
        }
        page = 1;
        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
            setTimeout(() => {
                page++;

                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        page: page,
                        pageSize: 2,
                        proName: search
                    },
                    success: function(res){
                        if(res.data.length > 0){
                            //console.log(res);
                            var html = template('productlistTpl',res);
                            //console.log(html);
                            
                            $('.product-list .mui-row').append(html);

                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
                        }else{
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                        }
                    }
                });
            }, 1500);
        }
    }

    //点击跳转到商品详情
    function gettoDetail(){

        $('.product-list').on('tap','.product-buy',function(){
            var pId = $(this).data('id');

            location = 'detail.html?id=' + pId;
        });

    }

});