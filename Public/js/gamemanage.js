$(function(){
    if(!location.hash){
        location.href = location.pathname + '#list';
    }
    let tbody = $('tbody');

    $(window).on('hashchange',function(){
        $('#myTab> li,.tab-pane').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $(location.hash+'-tab').addClass('active');
        if(location.hash == '#list'){
            $.ajax({
                url:'/ktv1707/index.php/gamemanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');


 ///////////////////////////////////////////////////////
    let submit = $(':submit');
    submit.on('click',function(){
        let data = $('form').serialize();
        let formdata = new FormData($('form')[0]);
        formdata.append('aa','zhangsan');

        $.ajax({
            url:'/ktv1707/index.php/gamemanage/insert?'+data,
            data: formdata,
            processData:false,
            contentType:false,
            success:function (data){
                if(data =='ok'){
                    location.href = location.pathname+'#list';
                }else if(data == 'error'){

                }
            }
        })
    })

 ///////////////////////////////////////////////////////////
    tbody.on('click','.btn',function(){
        let tr = $(this).closest('tr');
        let ids = tr.attr('id');
        $.ajax({
            url:'/ktv1707/index.php/gamemanage/delete',
            data:{id:ids},
            success:function(data){
                if(data =='ok'){
                     tr.remove();
                }else if(data =='error'){
                    alert('fail')
                }
            }
        })



    })

  /////////////////////////////////////////////////////////
    tbody.on('blur','input',function(){
        let value = $(this).val();
        let type = $(this).closest('td').attr('type');
        let ids = $(this).closest('tr').attr('id');
        $.ajax({
            url:'/ktv1707/index.php/gamemanage/update',
            data:{id:ids,type,value},
            success:function(data){

            }
        })
    })

 ///////////////////////////////////////////////////////////
    function render(data){
        tbody.empty();
        let str = '';
        data.forEach(v=>{
            str +=`
            <tr id='${v.gid}'>
             <td>
                 ${v['gid']}
             </td>
             <td type='gname'>
                 <input type="text" value="${v['gname']}" name="gname"> 
             </td>
             <td type='type'>
                <input type="text" value="${v['type']}"> 
             </td>
             <td>
                <button class="btn btn-info">删除</button>
             </td>
</tr> 
            `;
        })
        tbody.html(str);
    }




})