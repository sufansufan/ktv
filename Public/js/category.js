$(function(){
   let ranger = $('.ranger');

///////////////////////////加载数据///////////////////////
   $.ajax('/ktv1707/index.php/category/query',{
       method:'post',
       dataType:'json',
       success:function(data){
           // 分类  stype
            render(ranger,data);
       }
   });
    //////////////////购物车添加/////////////////////////////////

   /////////////////////页面展示、热度///////////////////
    function render(obj,data){
       obj.empty();
       for(let i=0;i<data.length;i++){
           let str = `
               <li style="background: url(${data[i]['cimg']}) no-repeat center/cover;">
            <a href="/ktv1707/index.php/music?cid=${data[i]['cid']}">
                <h4> ${data[i]['cname']}</h4>
            </a>
        </li>
           `;
           obj.html(function(i,val){
              return  val + str;
           })
       }
   }
});