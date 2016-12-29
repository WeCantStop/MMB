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
function getUrl(url){
    var obj={};
    //var url=location.search;
    var string=url.split('?')[1];
    string.split('&').forEach(function(ele){
        //结果是一个个的  中间是什么符号就用什么符号给分割开
        //console.log(ele);
        var b=ele.split('=');
        // ['page','5' ,"id", "1",]
        obj[b[0]]=b[1]?b[1]:'';
    })
    return obj;
}
var id=getUrl(location.href).id;
$.ajax({
    type:'get',
    url:'http://'+changeHref+'/api/getdiscountproduct?productid='+id,
    //url:'http://mmb.ittun.com/api/getdiscountproduct?productid='+id,
    dataType:'jsonp',
    success:function(data){
        console.log(data);
        var html='<h2>'+data.result[0].productName+'</h2>'
            +'<p class=price>'+data.result[0].productPrice+'</p>'
            +'<div class="main">'
            +'<div class="content w70 fl">'
            +'<h5>'+data.result[0].productFrom+data.result[0].productTime+data.result[0].productTips+'</h5>'
            +'<p class=jieshao>'+data.result[0].productInfo+'</p>'
            +'<div>'+data.result[0].productImg+'</div>'
            +'</div>'
            +'<div class=fr w30 cha>'
//            +data.result[0].productImgSm
            +'</div>'
            +'</div>'
        $('.detail_js').html(html);

        //获取评论区的书写框
        $('.pl').html(data.result[0].productComment);
        $('.tjdp').on('touchstart',function(){
            var html1=$('textarea').val();
            if(html1==''){
                alert('输入的内容不能为空');
                return;
            };
            $('textarea').val('');
            //获取当前的时间
            function getTime() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                var day = date.getDate();
                if (day < 10) {
                    day = "0" + day;
                }
                var hours = date.getHours();
                if (hours < 10) {
                    hours = "0" + hours;
                }
                var minute = date.getMinutes();
                if (minute < 10) {
                    minute = "0" + minute;
                }
                var second = date.getSeconds();
                if (second < 10) {
                    second = "0" + second;
                }
                var str = year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
                return str;
            }
            var html='<ul>'
                +'<li class="ui-border-b">'
                +'<div class="userimg"><img src="img/photo.png"></div>'
                +'<div class="con">'
                +'<div class="name clearfix">'
                +'<div class="username fl">尼古拉斯赵四</div>'
                +'<div class="time fr">'+getTime()+'</div>'
                +'</div>'
                +'<div class="content">'+html1+'</div>'
                +'</div>'
                +'</li>'
                +'</ul>'
            $('.list').append(html);
        })

    }
})
