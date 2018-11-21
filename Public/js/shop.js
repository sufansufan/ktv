$(function(){
   let  myScroll = new IScroll('.winelist');
   let  myScroll1 = new IScroll('.snacklist');
   let  nav = $('nav >div');
   let  wrapper = $('.wrapper');
   let wineList = $('.winelist>.scroll');
   let snackList = $('.snacklist>.scroll');
   let wineData = [];
   let snackData = [];
/////////////////////选项卡////////////////////////
   nav.on('click',function(){
       nav.removeClass('active');
       $(this).addClass('active');
       wrapper.removeClass('active');
       wrapper.eq($(this).index()).addClass('active');
   })
///////////////////////////加载数据///////////////////////
   $.ajax('/ktv1707/index.php/shop/query',{
       method:'post',
       dataType:'json',
       success:function(data){
           // 分类  stype
            wineData = data.filter(element=>{
                return  element.stype == 1
            })
            snackData = data.filter(element=>element.stype==2)
            render(wineList,wineData);
            render(snackList,snackData);
           myScroll = new IScroll('.winelist');
           myScroll1 = new IScroll('.snacklist');
       }
   });
    //////////////////购物车添加/////////////////////////////////
     let wineNum = $('.wineNum');
     let snackNum = $('.snackNum');
     let totalNum = $('.totalNum');
     let choose = $('.chooseList');
     let more = $('.more');
     let chooseList = [];

     $('.scroll').on('click','.plus',function(){
         let goods = JSON.parse($(this).closest('.list').attr('data'));
         let v = chooseList.filter(element=>element.sid == goods.sid);

         if(v.length){
             v[0].num++;
             $(this).prev().html(v[0].num);
         }else{
             goods.num = 1;
             $(this).prev().html(1);
             chooseList.push(goods);
         }
         totalNum.text(calcTotalNum());
         wineNum.text(calcWineNum());
         snackNum.text(calcSnackNum());

         renderChooseList(chooseList.slice(0,3));
         if(isShow()){
             more.addClass('active');
         }else{
             more.removeClass('active');
         }
     });
     //////////////////购物车减///////////////////////

     $('.scroll').on('click','.reduce',function(){
         let goods = JSON.parse($(this).closest('.list').attr('data'));
         let v = chooseList.filter(ele=> ele.sid == goods.sid);
         if(v.length) {
                  v[0].num--;
                  if(!v[0].num){
                      chooseList = chooseList.filter(ele => ele.sid != goods.sid);
                  }
                  $(this).next().html(v[0].num);
         }
         totalNum.text(calcTotalNum());
         wineNum.text(calcWineNum());
         snackNum.text(calcSnackNum());

         renderChooseList(chooseList.slice(0,3));
         if(isShow()){
             more.addClass('active');
         }else{
             more.removeClass('active');
         }

     })

     //////////////////////选好了////////////////////////
     let shopSure = $('.shopSure');
     shopSure.on('click',function(e){
         e.preventDefault();
         localStorage.setItem('shop',JSON.stringify(chooseList));
         location.href = '/ktv1707/index.php/shop/shopSure'
     });

    //////////////////////more///////////////////////////
         function isShow(){
            // $('.chooseList div');
           return $('div',choose).length ==3?true:false;
         }
    //////////////////已选商品///////////////////////////
         function renderChooseList(data){
                 choose.empty();
                 for(let i=0;i<data.length;i++){
                     $('<div>').html(`${data[i]['sname']}  ${data[i]['num']}`).appendTo(choose);
                 }
            }
    /////////////合计///////////////////////////////////
        function calcTotalNum(){
            let num = 0;
            chooseList.forEach(element=>{
               num += element.sprice * element.num
            })
            return num.toFixed(2);
        }
        function calcWineNum(){
            let num = 0;
            chooseList.filter(ele=>ele.stype==1).forEach(element=>{
                num +=element.num
            });
               return num;
        }
        function calcSnackNum(){
        let num = 0;
        chooseList.filter(ele=>ele.stype==2).forEach(element=>{
            num +=element.num
        });
        return num;
    }
   /////////////////////页面展示、热度///////////////////
        function render(obj,data){
       obj.empty();
       for(let i=0;i<data.length;i++){
           let str = `
               <li data='${JSON.stringify(data[i])}' class="list">
               <div class="thumb">
                   <img src="${data[i]['simg']}" alt="">
               </div>
               <ul class="data">
                   <li class="title">
                       <span class="sname">${data[i]['sname']}</span>
                      <div class="hot">
                          ${createHot(data[i]['shot'])}
                      </div>
                   </li>
                   <li class="price">
                       <span>¥</span>
                       <span class='pricenum'>${data[i]['sprice']}</span>
                       <span>/瓶</span>
                   </li>
                   <li class="option">
                       <span class="reduce"></span>
                       <span class="count">0</span>
                       <span class="plus"></span>
                   </li>
               </ul>
           </li>
           `;
           obj.html(function(i,val){
              return  val + str;
           })
       }
   }
        function createHot(num){
       let str = '';
       for(let i=0;i<num;i++){
           str +=`<img src='/ktv1707/Public/img/sd20.png' alt=''>`
       }
       return str;
   }


});