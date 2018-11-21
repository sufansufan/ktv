$(function(){
   let user = $('#user');
   let pass = $('#pass');
   let sub = $(':submit');
   let form =$('form');

   // 验证
   $('input,textarea,select').on('blur',function(){
       let me = $(this);
       let validate = me.attr('data-validate');
       // let value = me.val().trim();
       let value = me.val().replace(/^\s*|\s*$/g,'');

       me.closest('.form-group').find('.form-help').remove();

       if(validate){
         let arr = validate.split(';');
         for(let i=0;i<arr.length;i++){
             // arr[i]  type:tips
             let validateArr = arr[i].split(':');
             let flag = true;
             if(!validateType(value,validateArr[0])){
                 // 显示提示
                 // flag = false;
                 $('<div>').addClass('form-help').text(validateArr[1]).insertAfter(this);
                 break;
             }


         }
       }
   });

   // require username  password  phone qq email url 汉字
   function validateType(value,type){
       switch (type){
           case 'require':
               return /[^(^\s*|\s*$)]/.test(value);
               break;
           case "username":
               return /^[a-zA-Z]{3,10}$/.test(value);
               break;
           case 'password':
               return /^\w{3,10}$/.test(value);
               break;
           case 'qq':
               return /[1-9]\d{4,9}/.test(value);
               break;

       }

   }

   ////////////////////////提交//////////////////////////////
   sub.on('click',function(){
       // let data = {user: user.val(),pass:pass.val()};
       $('input').trigger('blur');
       let length = $('form .form-help').length;
       if(length){
           return ;
       }
       let data = form.serializeArray();
       let obj = {};
       let dataStr = form.serialize();
       $.each(data,function(i,v){
           obj[v.name] = v.value;
       })

       $.ajax({
           url:'/ktv1707/index.php/login/check',
           data:obj,
           success:function(data){
               if(data=='ok'){
                   location.href = '/ktv1707/index.php/gamemanage';
               }else if(data=='error'){
                 alert('fail');
               }
           }

       })

       return false;
   })

})
