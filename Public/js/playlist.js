$(function(){
    let playlist = [];
    let middle = $('.middle');


    render();

    $('.middle').on('click','.tops',function(){
        let sid = $(this).closest('li').attr('id');
        // playlist.filter(ele=>ele.oid==sid);
        let index = 0;
        for(let i=0;i<playlist.length;i++){
            if(playlist[i].oid == sid){
                index = i;
            }
        }
        playlist.unshift(playlist.splice(index,1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();
    });


    function render(){
        if(localStorage.song){
            playlist = JSON.parse(localStorage.song);
        }
        $('.header span').html(`共${playlist.length}首`);
        middle.empty();
        let str = '';
        playlist.forEach(element=>{
           str +=`
           <li id="${element.oid}">
                <div class="shadow"></div>
                <div class="num">
                    <a href="/ktv1707/index.php/play?oid=${element.oid}">
                        <img src="/ktv1707/Public/img/thumb.png" alt="">
                    </a>
                </div>
                <div class="song">
                    <a  href="/ktv1707/index.php/play?oid=${element.oid}" class="name"> ${element.oname}- ${element.sname}</a>
                    <sp     an class="time">${element.otime}</span>
                </div>
                <div class="add">
                    <div class="del rotate"></div>
                    <div class="tops"></div>
                </div>
            </li>
           `;
        })
        middle.html(str);
    }
})