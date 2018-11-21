$(function(){
    let  myScroll = new IScroll('.wrapper',{
        click:true
    });
    let wineList = $('.winelist>.scroll');
    let chooseList = JSON.parse(localStorage.shop);
    let totalNum = $('.totalNum');
    let totalPrice = $('.totalPrice');
    let shopSure = $('.shopSure');
    /////////////////////显示数据/////////////////////////////
    render(wineList,chooseList);
    //////////////////购物车加///////////////////////////
    $('.scroll').on('click','.' +
        'plus',function(){
        let goods = JSON.parse($(this).closest('.list').attr('data'));
        let v = chooseList.filter(element=>element.sid == goods.sid);

        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num);
        }

        $(this).next('.itemTotal').html((v[0].num*v[0].sprice).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice())
    });
    //////////////////购物车减///////////////////////
    $('.scroll').on('click','.reduce',function(){
        let goods = JSON.parse($(this).closest('.list').attr('data'));
        let v = chooseList.filter(ele=> ele.sid == goods.sid);

        if(v.length) {
            v[0].num--;
            if(!v[0].num){
                chooseList = chooseList.filter(ele => ele.sid != goods.sid);
                localStorage.shop = JSON.stringify(chooseList);
                $(this).closest('.list').animate({marginLeft:'-100%'}).queue(function(){
                    $(this).closest('.list').remove();
                    myScroll.refresh();
                })
            }
            $(this).next().html(v[0].num);
        }

        $(this).siblings('.itemTotal').html((v[0].num*v[0].sprice).toFixed(2));
        totalNum.text(countTotalNum());
        totalPrice.text(countTotalPrice())
    })
    ////////////////////提交订单/////////////////////////////
         shopSure.on('click',function(){
             let newarr = [];
             chooseList.forEach(element=>{
                 let obj = {sid:element.sid,count:element.num,total:element.sprice*element.num};
                 newarr.push(obj);
                /*let {sid,num,sprice} = element;
                newarr.push({sid,num,sprice});*/
             }) ;
             $.ajax('/ktv1707/index.php/shop/submit',{
                 data:{name:JSON.stringify(newarr)},
                 method:'get',
                 success:function(data){
                     if(data == 'ok'){
                         // alert('success')
                         location.href = '/ktv1707/index.php/home';
                     }else{
                         alert('fail');
                     }
                 }
             })


             return false;
         })
    /////////////////////////////////////////////////


    function countTotalNum(){
        let num = 0;
         chooseList.forEach(element=>{
             num+=element.num;
         })
        return num;
    }
    function countTotalPrice(){
        let num = 0;
        chooseList.forEach(element=>{
            num += element.num*element.sprice;
        })
        return num.toFixed(2);
    }
    function render(obj,data){
        obj.empty();
        let str = '';
        for(let i=0;i<data.length;i++){
            str +=`
             <li data='${JSON.stringify(data[i])}' class="list">
               <div class="thumb">
                   <img src="${data[i]['simg']}" alt="">
               </div>
               <ul class="data">
                   <li class="title">
                      <span class="sname">${data[i]['sname']}</span>
                      <div class="des">
                          <span class="description">
                             ${data[i]['sdescription']}
                          </span>
                          <span class="rl">${data[i]['srl']}</span>
                      </div>
                   </li>
                   <li class="option">
                       <span class="reduce"></span>
                       <span class="count">${data[i]['num']}</span>
                       <span class="plus"></span>
                       <span class="itemTotal">${(data[i]['num']*data[i]['sprice']).toFixed(2)}</span>
                   </li>
               </ul>
           </li>
            `;
        }
        obj.html(str);
        totalNum.html(countTotalNum());
        totalPrice.html(countTotalPrice());
        myScroll.refresh();
    }

});

/*
*  order
*     oid  user  time  status(状态)
*      1                   0
*
*  orderextra
*     eid   sid  count  price  oid
*      1      1    2      5     1
*      2      1    3      6     2
*
*   前台
*    chooseList
*    [
*      {sid,sname,simg,shot,num,sprice}
*      {sid,sname,simg,shot,num,sprice}
*      {sid,sname,simg,shot,num,sprice}
*      {sid,sname,simg,shot,num,sprice}
*      {sid,sname,simg,shot,num,sprice}
*    ]
*
*    [
*      {sid,count,sprice},
*      {sid,count,sprice},
*      {sid,count,sprice},
*      {sid,count,sprice}
*    ]
*    sid  count  price
* */