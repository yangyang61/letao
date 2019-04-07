$(function(){
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();

    // 初始化搜索历史区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 添加搜索历史
    function addHistory(){
        $('.btn-search').on('tap',function(){
            var search = $('.input-search').val().trim();

            if(search == ''){
                return;
            }

            var arr = getHistoryData();

            for(var i=0;i<arr.length;i++){
                if(arr[i] == search){
                    arr.splice(i,1);
                    i--;
                }
            }
            arr.unshift(search);
            
            setHistoryData(arr);

            $('.input-search').val('');
            queryHistory();

            location = './productlist.html?search=' + search;
        });
    }

    //查询搜索历史
    function queryHistory(){
        
        var arr = getHistoryData();
        
        var html = template('searchHistoryTpl',{rows: arr});
        $('.search-history ul').html(html);
    }

    //删除搜索历史
    function deleteHistory(){
        $('.mui-card-content ul').on('tap','.mui-badge',function(){

            var index = $(this).data('index');
            
            var arr =  getHistoryData();
            
            arr.splice(index,1);
            
            setHistoryData(arr);
            queryHistory();
        });
    }

    //清空搜索历史
    function clearHistory(){
        //推荐removeItem，因为clear清空所有的值（别的数据别的页面不能乱删啊）
        $('.btn-clear').on('tap',function(){
            
            localStorage.removeItem('searchHistory');
            queryHistory();

        });
    }

    //定义封装函数，查询历史记录的数据
    function getHistoryData(){

        var arr = localStorage.getItem('searchHistory');
            
        if(arr == null){
            arr = [];
        }else{
            arr = JSON.parse(arr);
        }

        return arr;
    }

    //定义封装函数，设置balabala
    function setHistoryData(arr){
        localStorage.setItem('searchHistory',JSON.stringify(arr));
    }
});