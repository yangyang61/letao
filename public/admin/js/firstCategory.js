var currentPage = 1,totalPages = 1;
$(function(){

    queryTopCategory();
    addCategory();
    exit();

    //查询一级分类
    function queryTopCategory(){
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: 5
            },
            success: function(data){
                // console.log(data);
                var html = template('firstCategoryTpl',data);

                $('#info table tbody').html(html);
                initPage(function(){
                    queryTopCategory();
                })
                
            }
        });
    }

    //点击添加一级分类
    function addCategory(){
        $('.btn-save').on('click',function(){
            var categoryName = $('.category-name').val().trim();

            if(!categoryName){
                alert("请输入分类名称");
                return false;
            }else if(categoryName.length > 3){
                alert("分类名称不能超过三个字")
                return false;
            }

            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: categoryName
                },
                success: function(data){
                    if(data.success){
                        queryTopCategory();

                        $('.category-name').val('');
                    }
                }
            });
        });
    }
});
