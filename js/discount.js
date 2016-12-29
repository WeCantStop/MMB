/**
 * Created by lenovo on 2016/12/7.
 */
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
$(function(){
    $.ajax({
        type: 'get',
        url: 'http://'+changeHref+'/api/getinlanddiscount',
        // url: 'http://mmb.ittun.com/api/getinlanddiscount',
        dataType: 'jsonp',
        success: function(data){
            console.log(data.result);
            var html=template('tpl',{num:data.result})
            var include=document.querySelector('.include');
            include.innerHTML=html;
        }
    })

    $(window).on('scroll',function(){
        var warn=$('.warn').offset().top;
        console.log(warn);
        var scroll=$(this).scrollTop();
        console.log(scroll);
        if((scroll-warn)>-600){
            $('.warn').html('请稍等...');
            $.ajax({
                type: 'get',
                url: 'http://'+changeHref+'/api/getinlanddiscount',
                //url: 'http://mmb.ittun.com/api/getinlanddiscount',
                //dataType: 'jsonp',
                success: function(data){
                    var result=data.result;
                    result.splice(0,result.length-4);//上边是截取的  这是截取过后原数组剩下的
                    var html=template('tpl',{num:result})
                    var include=document.querySelector('.include');
                    $('.include').append(html);
                }
            })
        }
    })

})
