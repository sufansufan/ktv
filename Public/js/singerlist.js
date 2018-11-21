$(function(){
   let ranger = $('.scroll');
    let  myScroll = new IScroll('.ranger');
   let cid = location.search.slice(-1);
///////////////////////////加载数据///////////////////////
   $.ajax('/ktv1707/index.php/music/show',{
       method:'get',
       data:{cid},
       dataType:'json',
       success:function(data){
           // 分类  stype
            render(ranger,data);
       }
   });
 /////////////////////页面展示、热度///////////////////
    function render(obj,data){
        $('.header p').text(data[0]['cname']);
       obj.empty();
       for(let i=0;i<data.length;i++){
           let str = `
                 <li>
                 <a href="/ktv1707/index.php/music/song?sid=${data[i]['sid']}">
                     <img src="${data[i]['spic']}" alt="">
                 </a>
                 <p>${data[i]['sname']} (${data[i]['hits']})</p>
             </li>
           `;
           obj.html(function(i,val){
              return  val + str;
           })
       }
       myScroll.refresh();
    }
});