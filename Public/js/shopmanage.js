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
                url:'/ktv1707/index.php/shopmanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
    });
    $(window).triggerHandler('hashchange');
 //////////////////////////上传图片////////////////////////////
  let upload = document.querySelector('#image');
  let thumb = document.querySelector('#thumb');
  let hidden = document.querySelector('input[type=hidden]');
  let imgType = ['png','gif','jpeg','jpg'];
  let size = 5 * 1024 * 1024;
  upload.onchange = function(){

      [...this.files].forEach((element,index)=>{
          let eType = element.type.split('/')[1];
          if(!(element.size<=size && imgType.includes(eType))){
           alert('请检查你的文件类型和文件的大小');
           return ;
          }
          let reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = function(e){
              let imgs = new Image();
              imgs.width = 200;
              imgs.height = 200;
              imgs.src = e.target.result;
              let imgBox = document.querySelector('.imgBox');
              imgBox.appendChild(imgs);
          }
          let data = new FormData();
          data.append('file',element);
          let xml = new XMLHttpRequest();

          xml.upload.onprogress = function(e){
              document.querySelectorAll('.progress-bar')[index].style.width=`${e.loaded/e.total*100}%`;
          };
          xml.onload = function(){
              hidden.value += xml.response;
          };
          xml.open('post','/ktv1707/index.php/shopmanage/upload',true);
          xml.send(data);


      })





  }


 /////////////////////////////////////////////////////
    let submit = $(':submit');
    submit.on('click',function(){
        // let data = $('form').serialize();
        let data = new FormData($('form')[0]);
        // data.append('user','zhangsan');

        $.ajax({
            url:'/ktv1707/index.php/shopmanage/insert',
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
            <tr id='${v.sid}'>
             <td>
                 ${v['sid']}
             </td>
             <td type='sname'>
                 <input type="text" value="${v['sname']}" name="sname"> 
             </td>
             <td type='sdescription'>
                <input type="text" value="${v['sdescription']}" name="sdescription"> 
             </td>
              <td type='shot'>
                <input type="text" value="${v['shot']}" name="shot"> 
             </td>
              <td type='sprice'>
                <input type="text" value="${v['sprice']}" name="sprice"> 
             </td>
              <td type='srl'>
                <input type="text" value="${v['srl']}" name="srl"> 
             </td>
              <td type='simg'>
                 <img src="${v['simg']}" alt="" width="100"> 
             </td>
              <td type='stype'>
                 <input type="text" value="${v['stype']}" name="stype"> 
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