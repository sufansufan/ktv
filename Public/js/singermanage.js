$(function(){
    if(!location.hash){
        location.href = location.pathname+'#list';
    }

    $.ajax('/ktv1707/index.php/singermanage/category',{
        dataType:'json',
        success:function(data){
            let str = '';
            data.forEach(element=>{
                str +=`<option value="${element.cid}">${element.cname}</option>`
            })
            $('#cid').html(str);
        }
    })

    $(window).on('hashchange',function(){
        $('#myTab>li,.tab-pane').removeClass('active');
        $(location.hash+'-tab').parent().addClass('active');
        $(location.hash).addClass('active');
        if(location.hash=='#list'){
            $.ajax({
                url:'/ktv1707/index.php/singermanage/show',
                dataType:'json',
                success:function(data){
                    render(data)
                }
            })
        }else{
            $('form')[0].reset();
        }
    })
    $(window).triggerHandler('hashchange');
    let tbody = $('tbody');
    let submitBtn = $('button[type=submit]');
    submitBtn.on('click',function(e){
        e.preventDefault();
        let formData = new FormData($('#form')[0]);
        $.ajax({
            url:'/ktv1707/index.php/singermanage/insert',
            method:'post',
            data:formData,
            processData:false,
            contentType:false,
            success:function(data){
                location.href=location.pathname + '#list';
            }
        })

    })
    ///////////////////////////////////////////
    $('#file').on('change',function() {
        let that = this;
        $(this).prev().html(this.files[0].name)
        let reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function (e) {
            let imgs = new Image();
            imgs.width = 200;
            imgs.height = 200;
            imgs.src = e.target.result;
            $(imgs).appendTo($('.imgBox'));
            let data = new FormData();
            data.append('file',that.files[0]);
            $.ajax('/ktv1707/index.php/singermanage/upload',{
              method:'post',
              data:data,
              processData:false,
              contentType:false,
              success:  function(data){
                $('#hidden').val(data)
              }
            })
        }

    })
    ///////////////////////////////////////////
    tbody.on('click','.delete',function(){
        let tr = $(this).closest('tr');
        let id = tr.prop('id');
        $.ajax({
            url:'/ktv1707/index.php/singermanage/delete',
            data:{id},
            success:function(data){
                if(data=='ok'){
                    tr.remove();
                }else if(data == 'error'){
                    alert('删除失败');
                }
            }
        })
    })
    ///////////////////////////////////////////
    tbody.on('change','.rname,.pri',function(){
        let id = $(this).closest('tr').prop('id');
        let value = $(this).val();
        let key = $(this).attr('class');
        $.ajax({
            url:'/ktv1707/index.php/singermanage/update',
            data:{id,key,value},
            success:function(data){
                console.log(data);
            }
        })
    })
    ///////////////////////////////////////////
    function render(data){
        tbody.empty();
        data.forEach(function(v){
            let html=`
          <tr id="${v.sid}">
                    <td>
                        <input type="" value="${v.sid}" class="sid">
                     </td>
                    <td>
                        <input type="" value="${v.sname}" class="sname"> 
                      </td>
                     <td>
                         <img src="${v.spic}" width="100" alt="" class="spic"/>
                    </td>
                    <td>
                        <input type="" value="${v.hits}" class="hits"> 
                      </td>
                      <td>
                        <input type="" value="${v.cid}" class="cid"> 
                      </td>
                    <td>
                          <a href="javascript:void(0)" class="delete">删除</a>
                      </td>
                 </tr>
        `;
            tbody.html(function(index,value){
                return  value+html;
            });
        })

    }
})