$(function(){
    addHistory();
    queryHistory();

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

            var arr = localStorage.getItem('searchHistory');

            if(arr == null){
                arr = [];
            }else{
                arr = JSON.parse(arr);
            }

            for(var i=0;i<arr.length;i++){
                if(arr[i] == search){
                    arr.splice(i,1);
                    i--;
                }
            }
            arr.unshift(search);
            
            localStorage.setItem('searchHistory',JSON.stringify(arr));

            $('.input-search').val('');
            queryHistory();
        });
    }

    //查询搜索历史
    function queryHistory(){
        var arr = localStorage.getItem('searchHistory');
        // console.log(arr);
        
        if(arr == null){
            arr=[];
        }else{
            arr = JSON.parse(arr);
        }
        
        var html = template('searchHistoryTpl',{rows: arr});
        $('.search-history ul').html(html);
    }
});