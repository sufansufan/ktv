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
                url:'/ktv1707/index.php/categorymanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }else{
            $('form')[0].reset();
        }
    });
    $(window).triggerHandler('hashchange');
 //////////////////////////上传图片////////////////////////////
  let upload = document.querySelector('#image');
  let hidden = document.querySelector('input[type=hidden]');

  $(upload).on('change',function(){
     let data =  this.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(data);
     reader.onload = function(e){
        $('.imgBox').append(`<img src="${e.target.result}" />`);

         let formdata = new FormData();
         formdata.append('file',data);

         $.ajax('/ktv1707/index.php/categorymanage/upload',{
             method:'post',
             data:formdata,
             processData:false,
             contentType:false,
             success:function(data){
                 $(hidden).val(data);
             }
         })
     }
  })


 /////////////////////////////////////////////////////
    let submit = $(':submit');
    submit.on('click',function(){
        // let data = $('form').serialize();
        let data = new FormData($('form')[0]);
        // data.append('user','zhangsan');
        $.ajax({
            url:'/ktv1707/index.php/categorymanage/insert',
            data:data,
            method:'post',
            processData:false,
            contentType:false,
            success:function (data){
                if(data =='ok'){
                    location.href = location.pathname+'#list';
                }else if(data == 'error'){
                    alert(data)
                }
            }
        })
        return false;
    })

 ///////////////////////////////////////////////////////////
    tbody.on('click','.btn',function(){
        let tr = $(this).closest('tr');
        let ids = tr.attr('id');
        $.ajax({
            url:'/ktv1707/index.php/categorymanage/delete',
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
            url:'/ktv1707/index.php/categorymanage/update',
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
            <tr id='${v.cid}'>
             <td>
                 ${v['cid']}
             </td>
             <td type='cname'>
                 <input type="text" value="${v['cname']}" name="cname"> 
             </td> 
              <td type='cimg'>
                 <img src="${v['cimg']}" alt="" width="100"> 
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