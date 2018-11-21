$(function(){
   let sid =  location.search.slice(location.search.indexOf('=')+1);
   let list = localStorage.song ? JSON.parse(localStorage.song ) : [];

   $.ajax('/ktv1707/index.php/music/singershow',{
       data:{sid},
       dataType:'json',
       success:function(data){
           render(data);

       }
   })

    //////////////////收藏/////////////
    $('.songlist').on('click','.add',function(e){
         let tops = $(this).offset().top;
         let lefts = $(this).offset().left;
         let song = JSON.parse($(this).closest('li').attr('data'));

        if($(this).hasClass('rotate')){
            list = list.filter(ele=> ele.oid != song.oid);
        }else{
            list.push(song);
        }
         localStorage.song = JSON.stringify(list);
         $(this).toggleClass('rotate');
         $('<div>').css({width:20,height:20,background:'#ff318e',position:'absolute',top:tops,left:lefts,borderRadius:'50%'}).appendTo(document.body).animate({left:$('.aready').offset().left,top:$('.aready').offset().top}).queue(function(){
             $(this).remove();
         })


    });
   $('.songlist').on('click','.add.rotate',function(){

   })

    ///////////////////////////////////

    function render(data){
       // 歌手
       // data[0]
       // 歌曲
        $('.wrapper').empty();
        let str = ``;
        data[1].forEach((value,index)=>{
            str +=`
             <li data='${JSON.stringify(value)}'>
                    <div class="num">
                        ${index+1}
                    </div>
                    <div class="name">
                        <p> ${value.oname} </p>
                        <span> ${value.otime} </span>
                    </div>
                    <div class="add" style="background-image: url(/ktv1707/Public/img/add_07.png)"></div>
                </li>
            `;
        })

        $('.wrapper').html(str);
    }


})