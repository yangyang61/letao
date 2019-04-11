var totalPages = 1,currentPage = 1;
$(function(){

    queryUser();
    updateUser();
    exit();
   
    //查询用户列表了
    function queryUser(){

        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: 5
            },
            success: function (data) {  
                // console.log(data);
                
                var html = template('queryUserTpl',data);

                $('#info tbody').html(html);

                totalPages = Math.ceil(data.total / data.size);
                //请求到数据后初始化分页
                initPage(function(){
                    //调用首页查询用户信息的函数
                    queryUser();
                });
            }
        });
    }

   //点击编辑用户状态
   function updateUser(){
        $('#info table tbody').on('click','.btn-option',function(){
            // console.log(this);

            var id = $(this).data('id');
            var isDelete = $(this).data('is-delete');
            
           isDelete = isDelete ? 0 : 1;

           $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data:  {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if(data.success){
                        queryUser();
                    }
                }
           });
        });
   }
});