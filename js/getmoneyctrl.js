/**
 * Created by Will on 2016.12.7.
 */

//获取url地址栏后面的id
//返回一个对象，id:num;
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
function queryUrl(url) {
    var obj = {};
    var str = url.split('?')[1];
    str.split('&').forEach(function (item) {
        var arr = item.split('=');
        obj[arr[0]] = arr[1] ? arr[1] : '';
    });
    return obj;
}
var id = queryUrl(location.search).id;

$.ajax({
    type: 'get',
        url:'http://'+ changeHref+'/api/getmoneyctrlproduct?productid='+id,
    //url: 'http://mmb.ittun.com/api/getmoneyctrlproduct?productid='+id,
//        dataType: 'jsonp',
    success: function (data) {
        //商品描述内容区
        var html = '<h2>' + data.result[0].productName + '</h2>'
            + '<div class="price">' + data.result[0].productPinkage + '</div>'
            + '<div class="main">'
            + '<div class="content">'
            + '<h5>' + data.result[0].productFrom + data.result[0].productTime + data.result[0].productTips + '</h5>'
            + '<div class="fr cha">' + data.result[0].productImgSm
            + '</div>'
            + '<div class="jieshao">' + data.result[0].productInfo
            + '<div class="jieshao">' + data.result[0].productInfo1
            + '<div class="jieshao">' + data.result[0].productInfo2
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="bigImg">'
            + data.result[0].productImg2
            + '</div>';
        $('.detail_js').html(html);

        //城市有无货判断
        var cityStr = data.result[0].productCity;
        $('.city_area').html(cityStr);

        //城市有无货li点击变色事件
        var city_lis = $('#disstorck > li');
        city_lis.on('click',function(){
            $(this).css('backgroundColor','#FFF0F0');
            $(this).siblings().css('backgroundColor','#fff');
        })


        //评论区
        $('.pl').html(data.result[0].productComment);
        //点击增加用户评论
        $('.tjdp').on('click', function () {
            var html = $('textarea').val();
            var str = '<li class="ui-border-b">'
                + '<div class="userimg">'
                + '<img src="http://bbs.manmanbuy.com/images/face/none.gif">'
                + '</div>'
                + '<div class="con">'
                + '<div class="name clearfix">'
                + '<div class="username">1号用户</div>'
                + '<div class="time">'+ getTime()+'</div>'
                + '</div>'
                + '<div class="content">' + html + '</div>'
                + '</div>'
                + '</li>'
            $('.list > ul').prepend(str);
            $('textarea').val('');
        })


        // 调用时间函数
        function getTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var h = now.getHours();
            h = h >= 10 ? h : '0' + h;
            var m = now.getMinutes();
            m = m >= 10 ? m : '0' + m;
            var s = now.getSeconds();
            s = s >= 10 ? s : '0' + s;

            var result = year + '/' + month + '/' + date+ ' ' + h + ':' + m + ':' + s;
            return result;
        }

    }
});