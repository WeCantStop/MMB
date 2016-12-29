/**
 * Created by Will on 2016.12.7.
 */

//  nav ajax
var changeHref;
function getWay(location){
    var arr=location.split(':');
    return arr[1];
}
if(getWay(location.href)=='//localhost'){
    changeHref='192.168.50.130:8002';
}else{
    changeHref='mmb.ittun.com';
}
$.ajax({
    type: 'get',
        url:'http://'+changeHref+'/api/getindexmenu',
    //url: 'http://mmb.ittun.com/api/getindexmenu',
    success: function(data){
        var str = template('nav_icons', {item:data.result});
        $('.buy_nav_wrap').append(str);


    },
    complete:function(){
        var buy_nav_li = $('.buy_nav_wrap > li').height();
        $('.buy_nav_wrap').height(buy_nav_li * 2);
        var flag = true;

        $('.buy_nav_wrap').find('img[alt="更多"]').on('click', function () {
            if (flag){
                $('.buy_nav_wrap').anim({
                    height:buy_nav_li * 3 + 20
                },0.25,'easeOutElastic')
                flag = false;
            } else {
                $('.buy_nav_wrap').anim({
                    height:buy_nav_li * 2
                },0.25,'easeOutElastic')
                flag = true;
            }
        })
    }
})
//  折扣 ajax
$.ajax({
    type: 'get',
        url:'http://'+changeHref+'/api/getmoneyctrl',
    //url: 'http://mmb.ittun.com/api/getmoneyctrl',
    success: function(data){
        var str = template('pro_items', {item:data.result});
        $('.discount > .product').append(str);
    }
})
