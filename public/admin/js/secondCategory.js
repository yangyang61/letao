var currentPage = 1,totalPages = 1;
$(function(){
    
    querySecondCategory();
    addBrand();
    exit();

    //查询二级分类
    function querySecondCategory(){
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: 5
            },
            success: function(data){
                var html = template('secondCategoryTpl',data);
                $('#info table tbody').html(html);

                initPage(function(){
                    querySecondCategory();
                });
            }
        });
    }

    //添加品牌功能的函数
    function addBrand(){

        $('.btn-add-brand').on('click',function(){
            //先查出所有分类
            $.ajax({
                url: '/category/queryTopCategory',
                success: function(data){
                    var html = "";

                    for(var i=0;i<data.rows.length;i++){
                        html += '<option value="' + data.rows[i].id + '">' + data.rows[i].categoryName + '</option>';
                    }

                    $('.select-category').html(html);
                }
            }); 

            //实现图片上传预览
            $('.select-img').on('change',function(){
                var file = this.files[0];

                if(!file){
                    alert('请选择图片');
                    return false;
                }

                var formData = new FormData();

                formData.append('pic1',file);

                $.ajax({
                    url: '/category/addSecondCategoryPic',
                    data: formData,
                    type: 'post',
                    processData: false,
                    contentType: false,
                    success: function(data){
                        console.log(data);
                        
                        $('.brand-logo').attr('src',data.picAddr);
                    }
                })
            });

            //点击保存添加品牌
            $('.btn-save').on('click',function(){
                var categoryId = $('.select-category').val();
                var brandName = $('.brand-name').val().trim();
                var brandLogo = $('.brand-logo').attr('src');
                if(!brandName){
                    alert('请输入品牌名称');
                    return false;
                }
                if(!brandLogo){
                    alert('请选择图片');
                    return false;
                }

                $.ajax({
                    url: '/category/addSecondCategory',
                    type: 'post',
                    data:{
                        brandName: brandName,
                        categoryId: categoryId,
                        brandLogo: brandLogo,
                        hot: 1
                    },
                    success: function(data){
                        // console.log(data);
                        if(data.success){
                            querySecondCategory();
                        }
                    }
                });
            });
        });
    }
})