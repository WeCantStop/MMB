/**
 * Created by Will on 2016.11.28.
 */

//nav 部分ajax
//获取地址的方法
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
    //url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
    url: 'http://'+changeHref+'/api/getbaicaijiatitle',
    success: function (data) {
        var str = template('top_nav', {item: data.result});
        $('.nav_wrap').append(str);
    },
    complete: function () {
        //设置拖动nav事件
        var nav_wrap = $('.nav_wrap');
        var nav_lis = nav_wrap.find('li');
        var w = 0;
        nav_lis.each(function (index, ele) {
            w += Math.ceil($(ele).width());
        })
        nav_wrap.width(w + 1);
        var starX = 0;
        var dx = 0;
        var maxValue = 100;
        var currentX = 0;
        var nav_left_Width = $('.nav_left').width();
        var nav_ul_Width = $('.nav_wrap').width();

        //触摸开始
        nav_wrap.on('touchstart', function (e) {
            starX = e.touches[0].pageX;
            nav_wrap.removeClass('translationAll');
        });

        //滑动过程
        nav_wrap.on('touchmove', function (e) {
            dx = e.touches[0].pageX - starX;
            if (currentX + dx < maxValue && (currentX + dx) > -(nav_ul_Width + maxValue - nav_left_Width)) {
                nav_wrap[0].style.webkitTransform = "translateX(" + (currentX + dx) + "px)";
            }
        });

        //触摸结束
        nav_wrap.on('touchend', function () {
            currentX = currentX + dx;
            if (currentX > 0) {
                nav_wrap.addClass("translationAll");
                currentX = 0;
                nav_wrap[0].style.webkitTransform = "translateX(0px)";

            } else if (currentX < -(nav_ul_Width - nav_left_Width)) {
                nav_wrap.addClass("translationAll");
                currentX = -(nav_ul_Width - nav_left_Width);
                nav_wrap[0].style.webkitTransform = "translateX(" + -(nav_ul_Width - nav_left_Width) + "px)";
            }
        })
    }
});

//商品部分ajax
$.ajax({
    type: 'get',
    //url: 'http://mmb.ittun.com/api/getbaicaijiaproduct?titleid=0',
    url: 'http://'+changeHref+'/api/getbaicaijiaproduct?titleid=0',
    success: function (data) {
        var str = template('pro_item', {item: data.result});
        $('.pro_ul_wrap').append(str);
    },
    complete: function () {
        //点击nav 上 a标签改变样式
        var top_a = $('.nav_wrap a');
        top_a.eq(0).addClass('active');

        top_a.on('click', function () {
            top_a.each(function (index, ele) {
                $(ele).removeClass('active');
            });
            $(this).addClass('active');
            //设置标题
            $('.header_center > h2').html($(this).text() + ' - 白菜价');
            var titleid = $(this).attr('titleid');
            //url = 'http://mmb.ittun.com/api/getbaicaijiaproduct?titleid=' + titleid;
            url = 'http://'+changeHref+'/api/getbaicaijiaproduct?titleid=' + titleid;
            $.ajax({
                type: 'get',
                url: url,
                success: function (data) {
                    var str = template('pro_item', {item: data.result});
                    $('.pro_ul_wrap').html('').append(str);
                }
            })
        })
    }
});

//nav部分search按钮点击事件
$(".nav_right ").on('click', function () {
    $('.search_wrap').toggle();
    if ($('.search_wrap').css('display') == 'block'){
        $(this).css('background','url(img/search_close.png) 0 0 no-repeat');
    }else {
        $(this).css('background','url(img/search_baicai.png) 0 0 no-repeat');
    }
});